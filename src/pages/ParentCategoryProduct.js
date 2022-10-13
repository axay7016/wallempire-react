import React, { useLayoutEffect, useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { X } from 'heroicons-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fadeIn } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import ProgressiveImage from "react-progressive-graceful-image";
import Carousel from "react-multi-carousel";
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

export default function ProductCategory() {
    const ref = useRef();
    const navigate  = useNavigate();
    const { subcategory } = useParams();
    const [category, setcategory] = useState({});
    const [model, setmodel] = useState(false);
    const [product, setproduct] = useState([]);
    const [quality, setQuality] = useState(100);
    const [initImage, setInitImage] = useState('');
    const [tempItem1, settempItem1] = useState('');
    const [tempItem2, settempItem2] = useState('');
    const [tempItem3, settempItem3] = useState('');
    const [tempItem4, settempItem4] = useState('');
    const [productName, setProductName] = useState();
    const [current, setCurrent] = useState(0);
    const [length, setLength] = useState(0);
    const [scrollValue, setScrollValue] = useState(0);
    const [page, setPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [limit] = useState(20)
    const [mobileScreenStatus, setMobileScreenStatus] = useState(false)
    const [windowSize, setWindowSize] = useState(getWindowSize());

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    useEffect(() => {
        if (windowSize.innerWidth < 1008 || windowSize.innerHeight < 900) {
            setMobileScreenStatus(true)
        } else {
            setMobileScreenStatus(false)
        }
    }, [windowSize])

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const getItem = (item) => {
        setmodel(true)
        setProductName(item.postName)
        setInitImage(item?.postImage1)
        settempItem1(item?.postImage1)
        settempItem2(item?.postImage2 ? item.postImage2 : '')
        settempItem3(item?.postImage3 ? item.postImage3 : '')
        settempItem4(item?.postImage4 ? item.postImage4 : '')
    }

    const getDescItem = (item) => {
        navigate(`/productdetails?id=${item._id}&category=sub`)
        // window.open(`/productdetails?id=${item._id}`, '_blank')
    }

    const getProduct = async () => {
        const productRes = await axios.get(process.env.REACT_APP_SERVER_API + "/product?category_id=" + subcategory, {
            headers: {
                authorization: 'Basic d2FsbGVtcGlyZTp3YWxsZW1waXJl'
            }
        })
        if (productRes.status === 200) {
            await setproduct([])
            await setproduct(productRes.data.data.post)
            await setLength(productRes.data.data.post.length)
            await setTotalCount(productRes.data.data.count)
            const categoryRes = await axios.get(process.env.REACT_APP_SERVER_API + `/category?page=${page}&limit=${limit}&category_id=` + subcategory, {
                headers: {
                    authorization: 'Basic d2FsbGVtcGlyZTp3YWxsZW1waXJl'
                }
            })
            if (categoryRes.status === 200) {
                await setcategory(categoryRes.data.data[0])
            }
        }
    }

    const getPaginatedProducts = async () => {
        const productRes = await axios.get(process.env.REACT_APP_SERVER_API + "/product?category_id=" + subcategory, {
            headers: {
                authorization: 'Basic d2FsbGVtcGlyZTp3YWxsZW1waXJl'
            }
        })
        if (productRes.status === 200) {
            await setproduct([...product, ...productRes.data.data.post])
        }
    }

    const setImage = (image) => {
        settempItem1(image)
    }

    useLayoutEffect(() => {
        pageProcess()
    }, [subcategory])

    const pageProcess = async () => {
        await setproduct([])
        await getProduct()
    }

    var qua = 10;
    useEffect(() => {
        increceseImageQuality()
    }, [quality]);

    const increceseImageQuality = () => {
        if (quality <= 1000) {
            qua = quality + 10
            setQuality(qua)
        }
    }

    const styles = {
        fadeIn: {
            animation: 'x 1s',
            animationName: Radium.keyframes(fadeIn, 'fadeIn')
        }
    }

    useEffect(() => {
        setInitImage(product[current]?.postImage1)
        setImage(product[current]?.postImage1)
        settempItem2(product[current]?.postImage2 ? product[current].postImage2 : '')
        settempItem3(product[current]?.postImage3 ? product[current].postImage3 : '')
        settempItem4(product[current]?.postImage4 ? product[current].postImage4 : '')
        setProductName(product[current]?.postName)
    }, [current])

    const nextBanner = async () => {
        await setCurrent(item => item === length - 1 ? 0 : item + 1)
    }

    const prevBanner = async () => {
        await setCurrent(item => item === 0 ? length - 1 : item - 1)
    }

    const [scrollClientHeight, setScrollClientHeight] = useState()
    const onScroll = (e) => {
        setScrollValue(e.target.documentElement.scrollTop);
        setScrollClientHeight(e.target.documentElement.scrollHeight - e.target.documentElement.clientHeight)
    };
    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        if (mobileScreenStatus) {
            if ((scrollValue * 100) / scrollClientHeight > 95) {
                if (product.length < totalCount) {
                    var start = page
                    start = start + 1
                    setPage(start)
                    getPaginatedProducts()
                }
            }
        }
        else if (scrollValue == scrollClientHeight) {
            if (product.length < totalCount) {
                var start = page
                start = start + 1
                setPage(start)
                getPaginatedProducts()
            }
        }
        return () => window.removeEventListener('scroll', onScroll);
    }, [scrollValue]);
    return (
        <StyleRoot>
            <div ref={ref}>
                <Header />

                {mobileScreenStatus == false ?
                    <div className={model ? "model open pt-0" : "model"}>
                        <div className={(tempItem2 != '' && tempItem3 != '' && tempItem4 != '') ? 'grid grid-cols-5 gap-4' : 'grid grid-cols-4 gap-4'}>
                            <div className='col-span-5 pt-3 w-full bg-black'>
                                <div className="grid text-center items-center">
                                    {/* <div className="place-self-start ml-5">
                                        <img src="/resources/images/WE-full-logo.png" Loading="Lazy" width="250px" />
                                    </div> */}
                                    <div className="font-serif place-self-center">
                                        <h1 className='text-xl text-white font-bold'>{category?.name} - {productName}</h1>
                                    </div>
                                    <div className="">
                                        <X onClick={() => setmodel(false)} className="border-2 top-4 right-8 rounded-full border-white" />
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-5 md:col-span-4 p-0 max-h-128 w-full'>
                                <ProgressiveImage src={tempItem1} placeholder={'tiny-image.jpg'}>
                                    {(src, loading) => (
                                        loading ?
                                            <div className="h-full flex justify-center items-center insp-logo-frame ">
                                                <img src="/resources/images/WE-full-logo.png" className='animate-pulse' Loading="Lazy" width="250px" />
                                            </div>
                                            :
                                            <img
                                                style={styles.fadeIn}
                                                className={`image${loading ? " loading" : " loaded object-contain h-full w-full"}`}
                                                src={tempItem1}
                                                alt={productName}
                                            />
                                    )}
                                </ProgressiveImage>
                            </div>
                            {
                                (tempItem2 != '' && tempItem3 != '' && tempItem4 != '') ?
                                    <div className=' max-h-128 grid sm:flex md:grid gap-3'>
                                        <LazyLoadImage className='object-fill rounded-md cursor-pointer h-52 w-72' src={tempItem2} onClick={() => setImage(tempItem2)} alt="No Image Available" />
                                        <LazyLoadImage className='object-fill rounded-md cursor-pointer h-52 w-72' src={tempItem3} onClick={() => setImage(tempItem3)} alt="No Image Available" />
                                        <LazyLoadImage className='object-fill rounded-md cursor-pointer h-52 w-72' src={tempItem4} onClick={() => setImage(tempItem4)} alt="No Image Available" />
                                    </div>
                                    :
                                    null
                            }

                            <section className="col-span-5 pl-4">
                                <Carousel autoPlay={false} shouldResetAutoplay={true} pauseOnHover={true} responsive={responsive}>
                                    {
                                        product?.map((item, index) => {
                                            return (
                                                <div className="flex h-44 items-center mr-4" key={index} onClick={() => getItem(item)}>
                                                    <figure className="relative cursor-pointer h-44 w-full">
                                                        <ProgressiveImage src={tempItem1} placeholder={'tiny-image.jpg'}>
                                                            {(src, loading) => (
                                                                loading ?
                                                                    <div className="flex justify-center items-center h-52 w-72">
                                                                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-yellow-300 mb-4" role="status">
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <img
                                                                        className={`image${loading ? " loading" : " loaded rounded-lg shadow-xl w-full h-44 object-cover"}`}
                                                                        src={item.postImage1}
                                                                        alt={productName}
                                                                    />
                                                            )}
                                                        </ProgressiveImage>
                                                    </figure>
                                                </div>
                                            )
                                        }
                                        )}
                                </Carousel>
                            </section>
                        </div>
                    </div>
                    :
                    <div className={model ? "model open p-5" : "model"}>
                        <div className='grid gap-4'>
                            <div className='pt-3 w-full bg-black'>
                                <div className="text-center items-center">
                                    <div className="font-serif place-self-center">
                                        <h1 className='text-xl text-white font-bold'>{category?.name} - {productName}</h1>
                                    </div>
                                    <div className="">
                                        <X onClick={() => setmodel(false)} className="border-2 top-8 right-6 rounded-full border-white" />
                                    </div>
                                </div>
                            </div>
                            <div className={(tempItem2 != '' && tempItem3 != '' && tempItem4 != '') ? "relative select-none flex items-center z-0 justify-center w-full h-72 sm:h-72 md:h-3/4" : "relative select-none flex items-center z-0 justify-center w-full h-128 sm:h-128 md:h-3/4"}>
                                <ArrowCircleLeftIcon
                                    style={{ padding: 0 }}
                                    className="h-7 md:h-10 absolute text-yellow-400 flex z-10 left-5 bg-white cursor-pointer rounded-full shadow-lg hover:shadow-none"
                                    onClick={prevBanner} />

                                <ArrowCircleRightIcon
                                    style={{ padding: 0 }}
                                    className="h-7 md:h-10 absolute text-yellow-400 flex z-10 right-5 bg-white cursor-pointer rounded-full shadow-lg hover:shadow-none"
                                    onClick={nextBanner} />

                                {/* <LazyLoadImage
                                    style={styles.fadeIn}
                                    className={(tempItem2 != '' && tempItem3 != '' && tempItem4 != '') ? "flex relative object-contain h-72 sm:h-72 md:h-96 w-full" : "flex relative object-contain h-128 sm:h-128 md:h-96 w-full"}
                                    alt="Banner images"
                                    src={tempItem1} /> */}
                                <ProgressiveImage src={tempItem1} placeholder={'tiny-image.jpg'}>
                                    {(src, loading) => (
                                        loading ?
                                            <div className="h-full flex justify-center items-center insp-logo-frame ">
                                                <img src="/resources/images/WE-full-logo.png" className='animate-pulse' Loading="Lazy" width="250px" />
                                            </div>
                                            :
                                            <img
                                                style={styles.fadeIn}
                                                className={`image${loading ? " loading" : "flex relative object-contain h-72 sm:h-72 md:h-96 w-full loaded"}`}
                                                src={tempItem1}
                                                alt={productName}
                                                width="700"
                                                height="465"
                                            />
                                    )}
                                </ProgressiveImage>

                            </div>
                            {
                                (tempItem2 != '' && tempItem3 != '' && tempItem4 != '') ?
                                    <><div className='grid grid-cols-2 overflow-x-auto gap-4 items-end'>
                                        <LazyLoadImage className='object-fill rounded-md cursor-pointer h-28 md:h-60 w-full' src={initImage} onClick={() => setImage(initImage)} alt="No Image Available" />
                                        <LazyLoadImage className='object-fill rounded-md cursor-pointer h-28 md:h-60 w-full' src={tempItem2} onClick={() => setImage(tempItem2)} alt="No Image Available" />
                                    </div><div className='grid grid-cols-2 overflow-x-auto gap-4'>
                                            <LazyLoadImage className='object-cover rounded-md cursor-pointer h-28 md:h-60 w-full' src={tempItem3} onClick={() => setImage(tempItem3)} alt="No Image Available" />
                                            <LazyLoadImage className='object-fill rounded-md cursor-pointer h-28 md:h-60 w-full' src={tempItem4} onClick={() => setImage(tempItem4)} alt="No Image Available" />
                                        </div></>
                                    : null
                            }

                        </div>
                    </div>
                }

                <div className='pl-4 pr-4 md:pt-24'>
                    <div className='grid md:place-items-center'>
                        <div className='mt-20 md:mt-5 md:w-1/2 text-center mb-10 align-middlee'>
                            <h1 className='text-xl font-bold p-5'>{category?.name}</h1>
                            {/* <h2 className='text-gray-500'>{category?.description}</h2> */}
                        </div>
                    </div>
                    <div className='gallary grid sm:grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {
                            product?.map((item, index) => {
                                return (
                                    <div className="pics_container relative">
                                        <div class="flex items-center justify-center bg-indigo-50 ">
                                            <div class="overflow-hidden bg-gray-200 duration-200">
                                                <div className='mt-2 mr-2 right-0 absolute'>
                                                    <div onClick={() => getItem(item)}>
                                                        <div>
                                                            <button type="button" class="inline-block bg-black rounded-full text-white hover:text-black hover:bg-white leading-normal uppercase shadow-md transform duration-200 hover:scale-105 hover:shadow-xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg w-7 h-7 md:w-10 md:h-10 p-1 md:p-2.5">
                                                                <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"
                                                                    fill='currentColor' image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 396.94"><path fill-rule="nonzero" d="M49.63 0h336.95c13.64 0 26.03 5.64 35 14.6l.82.91c8.52 8.93 13.79 21.03 13.79 34.13v182.01c-8.72-2.42-17.63-4.27-26.69-5.48V192.2l-36.96 32.61c-21.85 1.34-42.73 6.43-62.42 14.53l-40.98-39.31-27.44 78.69c-.4 2.81-1.59 5.18-3.25 7.02l-1.7 1.57c-5.12 3.94-12.95 3.92-17.94-1.81l-78.13-118.22L26.7 262.86v79.61c0 6.25 2.62 11.97 6.77 16.13 4.19 4.19 9.95 6.81 16.16 6.81H235c10.6 9.86 21.96 18.81 33.95 26.69H49.63c-13.57 0-26.02-5.61-35.03-14.63-8.96-8.96-14.6-21.37-14.6-35V49.64c0-13.66 5.59-26.09 14.57-35.07l.92-.84C24.42 5.24 36.46 0 49.63 0zm337.74 292.43c9.66 0 18.41 3.92 24.74 10.24 6.33 6.33 10.24 15.07 10.24 24.74 0 9.65-3.91 18.41-10.24 24.73-6.33 6.33-15.06 10.25-24.74 10.25-9.65 0-18.4-3.92-24.73-10.25a34.82 34.82 0 0 1-10.24-24.73c0-9.65 3.91-18.41 10.24-24.74 6.33-6.32 15.08-10.24 24.73-10.24zm-122.68 29.88c28.32-34.25 72.44-63.49 117.77-64.39 48.01-.97 96.09 29.72 127.66 64.45a7.207 7.207 0 0 1 .47 9.14c-26.32 37.15-73.49 65.2-119.34 65.43-46.78.21-97.89-28.89-126.93-65.24-2.25-2.84-2.03-6.84.37-9.39zm20.04 4.96c26.61 30.85 65.31 52.73 106.3 52.55 39.43-.19 75.09-21.01 99.09-52.07-28.24-29.46-65.39-53.54-107.15-52.72-39.06.79-73.06 23.66-98.24 52.24zM26.7 227.39c29.55-26.64 76.84-63.89 106.71-88.99 4.87-4.22 12.12-4.13 16.91-.04.97.81 1.68 1.78 2.49 2.75l67.52 105.51 26.92-75.68c1.99-10.57 14.47-14.08 22.04-7.05l62.79 60.12 77.42-72.04V49.64c0-5.94-2.36-11.48-6.2-15.61l-.6-.56c-4.16-4.15-9.88-6.77-16.12-6.77H49.63c-6.04 0-11.54 2.34-15.61 6.12l-.58.62c-4.15 4.16-6.74 9.9-6.74 16.2v177.75zM267.63 61.07c11.02 0 21.04 4.49 28.28 11.73 7.24 7.24 11.72 17.23 11.72 28.28 0 11.02-4.48 21.04-11.72 28.28-7.24 7.24-17.26 11.72-28.28 11.72-11.04 0-21.04-4.48-28.28-11.72-7.24-7.24-11.72-17.26-11.72-28.28 0-11.05 4.48-21.04 11.72-28.28 7.24-7.24 17.24-11.73 28.28-11.73zm12.21 27.8a17.249 17.249 0 0 0-12.21-5.04c-4.77 0-9.09 1.93-12.2 5.04a17.198 17.198 0 0 0-5.05 12.21c0 4.77 1.93 9.09 5.05 12.2 3.11 3.11 7.43 5.05 12.2 5.05s9.09-1.94 12.21-5.05c3.11-3.11 5.04-7.43 5.04-12.2s-1.93-9.1-5.04-12.21z" /></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ProgressiveImage src={item.postImage1} placeholder={'tiny-image.jpg'}>
                                                    {(src, loading) => (
                                                        loading ?
                                                            <div className="h-64 flex bg-indigo-50 justify-center items-center">
                                                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-yellow-300 mb-4" role="status">
                                                                </div>
                                                            </div>
                                                            :
                                                            // <img
                                                            //     key={index}
                                                            //     style={styles.fadeIn}
                                                            //     className={`image${loading ? " loading" : " loaded transition-all duration-1000"}`}
                                                            //     src={item.postImage1}
                                                            //     alt={productName}
                                                            //     width="700"
                                                            //     height="465"
                                                            //     loading='lazy'
                                                            //     onClick={() => getDescItem(item)}
                                                            // />
                                                            <div className=''>
                                                                <img key={index} style={styles.fadeIn} src={item.postImage1} alt="plant" class="h-auto " />
                                                                <div class="p-5">
                                                                    <p class="text-base font-serif font-bold mb-5 text-gray-700">{item.postName}</p>
                                                                    <button class="w-full rounded-md bg-gray-600  py-2 text-indigo-100 hover:bg-yellow-500 hover:shadow-md duration-75" onClick={() => getDescItem(item)}>See More</button>
                                                                </div>
                                                            </div>
                                                    )}
                                                </ProgressiveImage>
                                                {/* <ImageFadeIn images={[item.postImage1]} imageStyle={''} onClick={() => getItem(item.postImage1)} /> */}

                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <Footer />
            </div>
        </StyleRoot>
    )
}