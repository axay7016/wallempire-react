import React, { useState, useEffect } from 'react'
import Img from 'react-cloudinary-lazy-image'
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import ImageUploading from 'react-images-uploading';
import uploadGif from '../resources/images/cloud-upload.gif';
import S3 from 'aws-sdk/clients/s3'
import { randomBytes } from 'crypto'

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
];

export default function Product() {
    const bucketName = process.env.REACT_APP_AWS_BUCKET_NAME
    const region = process.env.REACT_APP_AWS_BUCKET_REGION
    const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY
    const secretAccessKey = process.env.REACT_APP_AWS_SECRET_KEY

    const s3 = new S3({
        region: region,
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    })

    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [pagination, setPagination] = useState([]);
    const [itemOffset] = useState(1);
    const [open, setOpen] = React.useState(false);
    const [postImage, setpostImage] = useState(['', '', '', '']);
    const [checkImage, setcheckImage] = useState([false, false, false, false]);
    const [nextCheckImage, setnextCheckImage] = useState([false, false, false, false, false]);
    const [subCategoryId, setSubCategoryId] = useState();
    const [category, setCategory] = useState([]);
    const [subcategory, setSubCategory] = useState([]);
    const [checkedState, setCheckedState] = useState(
        new Array(names.length).fill(false)
    );
    const [userData] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        getProduct()
    }, [pageCount])

    const getProduct = () => {
        if (userData == null) {
            navigate('/')
        } else {
            axios.get(process.env.REACT_APP_SERVER_API + '/product?page=' + pageCount, {
                headers: {
                    authorization: `Bearer ${userData.access_token}`
                }
            }).then(function (response) {
                setProduct(response.data.data.post)
                paginationPages(response.data.data.page)
                setCurrentItems(response.data.data.currentPage)
            }).catch(function (error) {
            });
        }
    }

    const paginationPages = (totalPage) => {
        var count = []
        for (var i = 0; i < totalPage; i++) {
            count.push(i)
        }
        setPagination(count);
    }

    const handleOpen = () => {
        setOpen(true);
        getCategory()
    };

    const getCategory = () => {
        if (userData == null) {
            navigate('/')
        } else {
            axios.get(process.env.REACT_APP_SERVER_API + '/category', {
                headers: {
                    authorization: `Bearer ${userData.access_token}`
                }
            }).then(function (response) {
                setCategory(response.data.data)
            }).catch(function (error) {
            });
        }
    }

    const checkSubCategory = (event) => {
        if (event.target.value != null && event.target.value != '') {
            let id = event.target.value
            if (userData == null) {
                navigate('/')
            } else {
                axios.get(process.env.REACT_APP_SERVER_API + '/category?category_id=' + id, {
                    headers: {
                        authorization: `Bearer ${userData.access_token}`
                    }
                }).then(function (response) {
                    let data = [], index = 0;

                    if (response.data.data) {
                        response.data.data?.forEach((item) => {
                            item.section?.forEach((subItem) => {
                                if (subItem.items.length > 0) {
                                    subItem.items?.forEach((subCate) => {
                                        data[index] = subCate
                                        index++
                                    })
                                }
                            })
                        })
                        setSubCategory(data)
                    }
                }).catch(function (error) {
                });
            }
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        let formData = new FormData();
        formData.append('postName', e.target.name.value);
        formData.append('description', e.target.description.value);
        formData.append('price', 0);
        formData.append('category_id', e.target.category.value);
        formData.append('postImage1', postImage[0]);
        formData.append('postImage2', postImage[1]);
        formData.append('postImage3', postImage[2]);
        formData.append('postImage4', postImage[3]);
        formData.append('sub_category_id', subCategoryId);
        formData.append('productStatus', e.target.type.value);
        formData.append('width', e.target.width.value);
        formData.append('composition', e.target.composition.value);
        formData.append('repeat_size', e.target.size.value);
        formData.append('weight_gsm', e.target.gsm.value);

        checkedState.map((item, index) => {
            if (item == true) {
                formData.append('end_use', names[index]);
            }
        });

        axios.post(process.env.REACT_APP_SERVER_API + '/product', formData, {
            headers: {
                authorization: `Bearer ${userData.access_token}`
            }
        })
            .then(function (response) {
                getProduct()
                handleClose()

                setpostImage(['', '', '', '']);
                setcheckImage([false, false, false, false]);
                setnextCheckImage([false, false, false, false, false]);
            })
            .catch(function (error) {
            });
        e.preventDefault();
    }

    const handleSubCategoryId = (e) => {
        setSubCategoryId(e.target.value)
    }

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

    const handlepostImage = (imageList, index) => {
        var status = checkImage.map((item, i) =>
            i == (index - 1) ? true : item
        )
        setcheckImage(status)
        if (postImage[index - 1]) {
            imageDelete(postImage[index - 1], (url) => {
                imageUpload(imageList[0], (url) => {

                    var image = postImage.map((item, i) =>
                        i == (index - 1) ? url : item
                    )
                    setpostImage(image)

                    status = nextCheckImage.map((item, i) =>
                        i == index ? true : item
                    )
                    setnextCheckImage(status)
                })
            })
        } else {
            imageUpload(imageList[0], (url) => {
                var image = postImage.map((item, i) =>
                    i == (index - 1) ? url : item
                )
                setpostImage(image)

                status = nextCheckImage.map((item, i) =>
                    i == index ? true : item
                )
                setnextCheckImage(status)
            })
        }
    };

    const imageDelete = async (imageFile, callback) => {
        // const data = await s3.deleteObject({
        //     Bucket: bucketName,
        //     Key: "Products/552972be4d5cc4e8b1ef3d5dff8c9ffd"
        // })
        callback();

    }

    const imageUpload = async (imageFile, callback) => {
        const rawBytes = await randomBytes(16)
        const imageName = rawBytes.toString('hex')

        const uploadURL = await s3.getSignedUrlPromise('putObject', {
            Bucket: bucketName,
            Key: "Products/" + imageName,
            Expires: 60
        })

        await fetch(uploadURL, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: imageFile.file
        })

        const imageUrl = uploadURL.split('?')[0]

        // const img = document.createElement('img')
        // img.src = imageUrl
        // document.body.appendChild(img)


        // const data = await s3.upload(uploadParams).promise()

        // console.log(data)

        callback(imageUrl)
    };

    return (
        <div>
            <Header />
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className='bg-white m-10 p-10'>
                    <div className="text-center mb-10">
                        <h1 className="font-weight-bold text-3xl">Product Uploading</h1>
                    </div>
                    <div class="grid grid-cols-3 gap-4 p-5">
                        <form onSubmit={e => { handleSubmit(e) }} id="hook-form" className="col-span-2">
                            <div className="w-full">
                                <input name="name" className="w-full text-lg py-2 mb-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" type="text" placeholder="Enter Product Name" />
                            </div>
                            <div>
                                <textarea name="description" className="mb-2 w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" col="10" row="10" placeholder="Enter Product Description"></textarea>
                            </div>
                            <div>
                                <select name="type" className="mb-2 w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500">
                                    <option value="non-premium">Non-premium</option>
                                    <option value="premium">Premium</option>
                                </select>
                            </div>
                            <div>
                                <select name="category" className="mb-2 w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" onChange={(e) => checkSubCategory(e)}>
                                    <option value="" selected>Please Select Category</option>
                                    {category.map((item, index) => {
                                        return (<option key={index} value={item._id}>{item.name}</option>)
                                    })}
                                </select>
                            </div>
                            <div>
                                <select name="subcategory" onChange={handleSubCategoryId} className="mb-2 w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500">
                                    <option value="" selected>Please Select Sub-Category</option>
                                    {subcategory.map((item, index) => {
                                        return (<option key={index} value={item._id}>{item.name}</option>)
                                    })}
                                </select>
                            </div>
                            <div>
                                <input name="width" className="mb-2 w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" type="text" placeholder="Enter width" />
                            </div>

                            <div>
                                <input name="composition" className="mb-2 w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" type="text" placeholder="Enter composition" />
                            </div>

                            <div>
                                <input name="size" className="mb-2 w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" type="text" placeholder="Enter repeat size" />
                            </div>

                            <div>
                                <input name="gsm" className="mb-6 w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" type="text" placeholder="Enter weight gsm" />
                            </div>

                            <div className='grid grid-cols-3 gap-4 '>
                                {names.map((name, index) => (
                                    <div>
                                        <input type="checkbox" name="end_use[]" onChange={() => handleOnChange(index)} id={`custom-checkbox-${index}`} checked={checkedState[index]} value={name} /> {name}
                                    </div>
                                ))}
                            </div>
                        </form>
                        <div>
                            <div className="w-full mb-5">
                                <ImageUploading
                                    onChange={(e) => handlepostImage(e, 1)}
                                    maxNumber={1}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        onImageUpload,
                                    }) => {
                                        // console.log(postImage);
                                        return (
                                            checkImage[0] ?
                                                postImage[0] != '' ? (
                                                    <div className="w-full h-32" onClick={onImageUpload}>
                                                        <img className='object-contain w-full h-full' src={postImage[0]} />
                                                    </div>
                                                ) : <div className="w-full h-32">
                                                    <img className='object-contain w-full h-full' src={uploadGif} />
                                                </div> : (<button
                                                    className="w-full h-32 border-2 border-dashed border-yellow-500 text-blue-500"
                                                    onClick={onImageUpload}
                                                >
                                                    Click or Drop here
                                                </button>)
                                        )
                                    }}
                                </ImageUploading>
                            </div>

                            {nextCheckImage[1] == true ? <div className="w-full mb-5">
                                <ImageUploading
                                    onChange={(e) => handlepostImage(e, 2)}
                                    maxNumber={1}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        onImageUpload,
                                    }) => (
                                        checkImage[1] ?
                                            postImage[1] != '' ?
                                                (
                                                    <div className="w-full h-32" onClick={onImageUpload}>
                                                        <img className='object-contain w-full h-full' src={postImage[1]} />
                                                    </div>
                                                ) : <div className="w-full h-32">
                                                    <img className='object-contain w-full h-full' src={uploadGif} />
                                                </div> : (<button
                                                    className="w-full h-32 border-2 border-dashed border-yellow-500 text-blue-500"
                                                    onClick={onImageUpload}
                                                >
                                                    Click or Drop here
                                                </button>)
                                    )}
                                </ImageUploading>
                            </div> : <div></div>}

                            {nextCheckImage[2] == true ? <div className="w-full mb-5">
                                <ImageUploading
                                    onChange={(e) => handlepostImage(e, 3)}
                                    maxNumber={1}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        onImageUpload,
                                    }) => (
                                        checkImage[2] == true ?
                                            postImage[2] != '' ? (
                                                <div className="w-full h-32" onClick={onImageUpload}>
                                                    <img className='object-contain w-full h-full' src={postImage[2]} />
                                                </div>
                                            ) : <div className="w-full h-32">
                                                <img className='object-contain w-full h-full' src={uploadGif} />
                                            </div> : (<button
                                                className="w-full h-32 border-2 border-dashed border-yellow-500 text-blue-500"
                                                onClick={onImageUpload}
                                            >
                                                Click or Drop here
                                            </button>)
                                    )}
                                </ImageUploading>
                            </div> : <div></div>}

                            {nextCheckImage[3] == true ? <div className="w-full mb-5">
                                <ImageUploading
                                    onChange={(e) => handlepostImage(e, 4)}
                                    maxNumber={1}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        onImageUpload,
                                    }) => (
                                        checkImage[3] == true ?
                                            postImage[3] != '' ? (
                                                <div className="w-full h-32" onClick={onImageUpload}>
                                                    <img className='object-contain w-full h-full' src={postImage[3]} />
                                                </div>
                                            ) : <div className="w-full h-32">
                                                <img className='object-contain w-full h-full' src={uploadGif} />
                                            </div> : (
                                                <button
                                                    className="w-full h-32 border-2 border-dashed border-yellow-500 text-blue-500"
                                                    onClick={onImageUpload}
                                                >
                                                    Click or Drop here
                                                </button>)
                                    )}
                                </ImageUploading>
                            </div> : <div></div>}
                            <div className="mt-10">
                                <button form="hook-form" type="submit" className="bg-yellow-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-yellow-600 shadow-lg">
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="pl-4 pr-4 pt-32 bg-gray-200">
                <div className="mb-1">
                    <div className="font-extrabold text-2xl text-center"> PRODUCT SECTION</div>
                    <div className="text-center">Creation And Modification Part Of Product</div>
                </div>
                <div className="w-full flex justify-center md:justify-end pr-6 sm:pr-10">
                    <button className='p-4 pt-3 pb-3 ml-5 rounded-xl w-full md:w-40 bg-yellow-500 hover:bg-yellow-600 text-white' onClick={() => handleOpen()}>+ Add Product</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                    {product.map((item, index) => {
                        var image = item.postImage1.split("/")
                        return (
                            <div key={index} className="rounded-xl shadow-2xl bg-gray-200 overflow-hidden divide-black">
                                <div className="overflow-hidden pb-2">
                                    <img
                                        src={item.postImage1}
                                    />
                                </div>
                                <div className="pl-2 overflow-hidden">
                                    <b>Name : </b>{item.postName}
                                </div>
                                <div className="pl-2 overflow-hidden pb-2">
                                    <b>Description : </b>{item.description}
                                </div>
                                <div className="divide-x divide-gray-400"></div>
                                <div className="grid grid-cols-3 divide-x divide-gray-400 pb-2">
                                    <div className="pl-2 overflow-hidden">
                                        <div className="w-full flex justify-center font-semibold">
                                            Status
                                        </div>
                                        <div className="w-full flex justify-center">
                                            {item.productStatus}
                                        </div>
                                    </div>
                                    <div className="pl-2 overflow-hidden">
                                        <div className="w-full flex justify-center font-semibold">
                                            Category
                                        </div>
                                        <div className="w-full flex justify-center">
                                            {item.category.name}
                                        </div>
                                    </div>
                                    <div className="pl-2 overflow-hidden">
                                        <div className="w-full flex justify-center font-semibold">
                                            Sub Category
                                        </div>
                                        <div className="w-full flex justify-center">
                                            {item.sub_category.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* <div>
                    {currentItems == 1 ? '' : <button onClick={() => setPageCount(currentItems - 1)} >Previous</button>}
                    {
                        pagination.map((count, index) => (
                            <span key={index} className='pagination' onClick={() => setPageCount(count + 1)}>{count + 1}</span>
                        ))
                    }
                    {currentItems == pagination.length ? '' : <button onClick={() => setPageCount(currentItems + 1)}>Next</button>}

                </div> */}
            </div>
            <Footer />
        </div >
    )
}
