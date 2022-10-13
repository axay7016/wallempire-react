import React, { useState, useEffect } from 'react'
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function FeatureProduct() {
    const navigate = useNavigate();
    const [featureProduct, setFeatureProduct] = useState([]);
    const [product, setProduct] = useState([]);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [itemOffset, setItemOffset] = useState(1);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [categoryId, setcategoryId] = useState();
    const [productId, setProductId] = useState();
    const [category, setCategory] = useState([]);
    const [error, seterror] = useState();

    useEffect(() => {
        getFeatureProduct()
    }, [pageCount])

    const getFeatureProduct = () => {
        let userData = JSON.parse(localStorage.getItem('user'));
        if (userData == null) {
            navigate('/')
        } else {
            axios.get(process.env.REACT_APP_SERVER_API + '/featuredProduct?page=' + pageCount + '&limit=' + itemOffset, {
                headers: {
                    authorization: `Bearer ${userData.access_token}`
                }
            }).then(function (response) {
                setFeatureProduct(response.data.data)
                // paginationPages(response.data.data.page)
                // setCurrentItems(response.data.data.currentPage)
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
        setcategoryId('')
        getCategory()
        seterror('')
        getProduct()
    };

    const getCategory = () => {
        let userData = JSON.parse(localStorage.getItem('user'));
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

    const getProduct = () => {
        let userData = JSON.parse(localStorage.getItem('user'));
        if (userData == null) {
            navigate('/')
        } else {
            axios.get(process.env.REACT_APP_SERVER_API + '/product', {
                headers: {
                    authorization: `Bearer ${userData.access_token}`
                }
            }).then(function (response) {
                setProduct(response.data.data.post)
            }).catch(function (error) {
            });
        }
    }

    const handleClose = () => {
        setOpen(false);
    };


    const handleCategory = (e) => {
        if (e.target.value != null && e.target.value != '') {
            setcategoryId(e.target.value)
        }
    }

    const handleProduct = (e) => {
        if (e.target.value != null && e.target.value != '') {
            setProductId(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        const data = {
            category_id: categoryId,
            product_id: productId
        }
        let userData = JSON.parse(localStorage.getItem('user'));
        axios.post(process.env.REACT_APP_SERVER_API + '/featuredProduct', data, {
            headers: {
                authorization: `Bearer ${userData.access_token}`
            }
        }).then(function (response) {
            getFeatureProduct()
                handleClose()
            }).catch(function (error) {
                seterror(error.response.data.message)
            });
        e.preventDefault();
    }


    return (
        <div>
            <Header />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <form onSubmit={e => { handleSubmit(e) }}>
                        <div>
                            <select className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" onChange={(e) => handleProduct(e)}>
                                <option value="" selected>Please Select Product</option>
                                {product.map((item, index) => {
                                    return (<option key={index} value={item._id}>{item.postName}</option>)
                                })}
                            </select>
                        </div>

                        <div>
                            <select className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" onChange={(e) => handleCategory(e)}>
                                <option value="" selected>Please Select Category</option>
                                {category.map((item, index) => {
                                    return (<option key={index} value={item._id}>{item.name}</option>)
                                })}
                            </select>
                        </div>
                                {error}
                        <div className="mt-10">
                            <button type="submit" className="bg-yellow-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-yellow-600 shadow-lg">
                                Add Feature Product
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            <div className="pl-4 pr-4 md:pt-32">
                <button className='addProduct' onClick={() => handleOpen()}>Add Feature Product</button>
                <table>
                    <thead>
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Description</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Categories</th>
                            <th className="p-4">Photos</th>
                        </tr>
                    </thead>
                    <thead>
                        {featureProduct.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="p-4">{item.postName}</td>
                                    <td className="p-4">{item.description}</td>
                                    <td className="p-4">{item.productStatus}</td>
                                    <td className="p-4">{item.price}</td>
                                    <td className="p-4">{item.categoryName}</td>
                                    <td className="p-4">
                                        <img className='productImage' src={item.postImage1}></img>
                                        <img className='productImage' src={item.postImage2}></img>
                                        <img className='productImage' src={item.postImage3}></img>
                                        <img className='productImage' src={item.postImage4}></img>
                                    </td>

                                </tr>
                            )
                        })}
                    </thead>
                </table>
                <div>
                    {currentItems == 1 ? '' : <button onClick={() => setPageCount(currentItems - 1)} >Previous</button>}
                    {
                        pagination.map((count, index) => (
                            <span key={index} className='pagination' onClick={() => setPageCount(count + 1)}>{count + 1}</span>
                        ))
                    }
                    {currentItems == pagination.length ? '' : <button onClick={() => setPageCount(currentItems + 1)}>Next</button>}

                </div>
            </div>
            <Footer />
        </div >
    )
}
