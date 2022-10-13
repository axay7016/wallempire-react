import React, { useEffect } from 'react'
import Header from '../components/Header.js';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer.js';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion"
import Logo from '../resources/images/wall empire.png';
import FadeCarousel from '../components/Animation/FadeCarousel.js';

export default function Home() {
    const authenticate = () => {
        return new Promise(resolve => setTimeout(resolve, 2000))
    }

    useEffect(() => {
        authenticate().then(() => {
            const ele = document.getElementById('progress-indicator')
            if (ele) {
                ele.classList.add('available')
                setTimeout(() => {
                    // ele.outerHTML = ''
                }, 2000)
            }
        })
    }, [])

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
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

    return (
        <motion.div exit={{ opacity: 0 }}>

            <Header />
            <Banner className="h-80 sm:h-80 md:h-1/2 lg:h-screen 2xl:h-screen w-full" />



            <main className="select-none max-w-7xl mx-auto px-8 sm:px-">
                <section className="pt-20">
                    <div className='w-full md:w-9/12 mb-5'>
                        <h1 className='font-bold md:text-3xl text-2xl'>New Arrival </h1>
                        <span className='text-gray-500 md:text-lg text-base text-justify'></span>
                    </div>

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5 items-center">
                        <div id="newArrival1">
                            <div className="relative lg:h-96 md:h-54 sm:h-60 h-48 w-full rounded-lg">
                                <FadeCarousel
                                    images={[
                                        "https://wall-empire.s3.ap-south-1.amazonaws.com/New_Arrival/01_BERLIN_COLLECTION.jpg",
                                        "https://wall-empire.s3.ap-south-1.amazonaws.com/New_Arrival/02_STITCHLESS_ROMAN.jpg",
                                        "https://wall-empire.s3.ap-south-1.amazonaws.com/New_Arrival/03_ALLOVER_THE_LATEST.jpg",
                                    ]}
                                    imageStyle={'lg:h-96 md:h-54 sm:h-60 h-48 w-full rounded-lg'}
                                />
                            </div>
                        </div>

                        <div id="newArrival2">
                            <div className="relative lg:h-96 md:h-54 sm:h-60 h-48 w-full rounded-lg">
                                <FadeCarousel
                                    images={[
                                        "https://wall-empire.s3.ap-south-1.amazonaws.com/New_Arrival/04_ALLOVER_NEW_WONDERS.jpg",
                                        "https://wall-empire.s3.ap-south-1.amazonaws.com/New_Arrival/05_WALLPAPER.jpg"
                                    ]}
                                    imageStyle={'lg:h-96 md:h-54 sm:h-60 h-48 w-full rounded-lg'}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pt-20">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2 items-center">
                        <div className='md:w-8/12'>
                            <h1 className='font-bold md:text-3xl text-2xl'>Top Selling This Month</h1>
                        </div>
                        <div id="topSelling">
                            <div className="relative lg:h-96 md:h-54 sm:h-60 h-48 w-full rounded-lg" >
                                <FadeCarousel
                                    images={[
                                        "https://wall-empire.s3.ap-south-1.amazonaws.com/Popular/01+Wall+Art.jpg",
                                        "https://wall-empire.s3.ap-south-1.amazonaws.com/Popular/02+Nature+Wallpaper.jpg",
                                        "https://wall-empire.s3.ap-south-1.amazonaws.com/Popular/03+Panel+Curtain.jpg",
                                        "https://wall-empire.s3.ap-south-1.amazonaws.com/Popular/04+Allover+Curtain-+Roam+into.jpg",
                                        "https://wall-empire.s3.ap-south-1.amazonaws.com/Popular/05+Allover+Curtain-+New+hit.jpg",
                                        "https://wall-empire.s3.ap-south-1.amazonaws.com/Popular/06+Zebra+Blind.jpg",
                                        "https://wall-empire.s3.ap-south-1.amazonaws.com/Popular/07+Roller+Blind.jpg"
                                    ]}
                                    imageStyle={'lg:h-96 md:h-54 sm:h-60 h-48 w-full rounded-lg'}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pt-20">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2 items-center">
                        <div className='md:w-8/12 flex justify-start'>
                            <h1 className='font-bold text-3xl'>Why us?</h1>
                        </div>
                        <div className='flex justify-center mt-5 md:justify-end'>
                            {/* <button className="bg-yellow-500 text-gray-100 p-4 w-1/2 rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-yellow-600 shadow-lg">
                                    BOOK A CONSULTATION
                                </button> */}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-9 grid-cols-2 gap-4 pt-10 text-center items-center relative">
                        <div className='col-span-4'>
                            <div className='flex justify-center shadow-2xl md:shadow-none md:justify-end pt-10 pb-10'>
                                <div>
                                    <img src="https://wall-empire.s3.ap-south-1.amazonaws.com/Icons/Innovative+technology.png" className='w-20 h-20 mx-auto' />
                                    <span className='text-base'>Innovative technology</span>
                                </div>
                            </div>
                            <div className='flex justify-center shadow-2xl md:shadow-none md:justify-center pt-10 pb-10'>
                                <div>
                                    <img src="https://wall-empire.s3.ap-south-1.amazonaws.com/Icons/superior+quality.png" className='w-20 h-20 mx-auto' />
                                    <span className='text-base'>Superior quality</span>
                                </div>
                            </div>
                            <div className='flex justify-center shadow-2xl md:shadow-none md:justify-end pt-10 pb-10'>
                                <div>
                                    <img src="https://wall-empire.s3.ap-south-1.amazonaws.com/Icons/Experienced+team.png" className='w-20 h-20 mx-auto' />
                                    <span className='text-base'>Experienced team</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img
                                className="h-48 invisible md:visible w-auto absolute -translate-y-1/2 -translate-x-1/4 transform"
                                src={Logo}
                                alt="wallempire logo"
                            />
                        </div>
                        <div className='col-span-4'>
                            <div className='flex justify-center shadow-2xl md:shadow-none md:justify-start pt-10 pb-10'>
                                <div>
                                    <img src="https://wall-empire.s3.ap-south-1.amazonaws.com/Icons/assurance.png" className='w-20 h-20 mx-auto' />
                                    <span className='text-base'>Quality assurance</span>
                                </div>
                            </div>
                            <div className='flex justify-center shadow-2xl md:shadow-none pt-10 pb-10'>
                                <div>
                                    <img src="https://wall-empire.s3.ap-south-1.amazonaws.com/Icons/production.png" className='w-20 h-20 mx-auto' />
                                    <span className='text-base'>Efficient production line</span>
                                </div>
                            </div>
                            <div className='flex justify-center shadow-2xl md:shadow-none md:justify-start pt-10 pb-10'>
                                <div>
                                    <img src="https://wall-empire.s3.ap-south-1.amazonaws.com/Icons/Product+sampling.png" className='w-20 h-20 mx-auto' />
                                    <span className='text-base'>Product sampling</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pt-20">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                        <div className='md:w-8/12'>
                            <h1 className='font-bold md:text-3xl text-2xl flex justify-start'>Customer Diaries</h1>
                        </div>
                        <div className='flex justify-center mt-5 md:justify-end'>
                        </div>
                    </div>
                    <Carousel responsive={responsive} className='pt-10 z-0'>
                        <div className="flex items-center mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Panel+Curtains+(1).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96 object-cover" />
                                <div className="absolute text-lg -mt-20 w-full text-white px-4 h-20 bg-gradient-to-b from-transparent to-black">
                                    <div>
                                        <h1>Surat</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Panel+Curtains.jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96 " />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Bangalore</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Roller+Blind+(3).jpg" layout="fill" className="rounded-lg shadow-xl hover:shadow-2xl w-full h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Delhi</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Wallpaper+(2).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Mumbai</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Wall+Frames+(1).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Hyderabad</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/All+Over+curtains+(2).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Pune</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/All+Over+curtains+(1).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Jaipur</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/All+Over+curtains+(3).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Nagpur</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Blinds.jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Nashik</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Panel+Curtains+(3).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Thiruvananthapuram</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Panel+Curtains+(4).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Noida</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Roller+Blind+(1).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Mangalore</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Roller+Blind+(2).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Udaipur</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Stitchless+Roman+(2).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Jammu</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Stitchless+Roman+(1).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Rajkot</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Wall+Frames+(2).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Thane</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Wall+Frames+(3).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Indore</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Wallpaper+(1).jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Ghaziabad</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex items-center md:mr-5">
                            <figure className="relative sm:max-w-xs cursor-pointer h-96 w-full">
                                <LazyLoadImage src="https://wall-empire.s3.ap-south-1.amazonaws.com/Customer_Diaries/Zebra+Blind.jpg" layout="fill" className="rounded-lg shadow-xl w-full hover:shadow-2xl h-96" />
                                <div className="absolute text-lg -mt-20 h-20 text-white px-4 bg-gradient-to-b from-transparent to-black w-full">
                                    <div>
                                        <h1>Amritsar</h1>
                                    </div>
                                </div>
                            </figure>
                        </div>
                    </Carousel>
                </section>

                <section className="pt-5">
                    <div
                        id="productImages"
                        className="carousel relative"
                        data-bs-ride="carousel">
                        <div className="relative md:h-128 sm:h-60 h-48 w-full rounded-lg">
                            <FadeCarousel
                                images={[
                                    "https://wall-empire.s3.ap-south-1.amazonaws.com/home/Ad+Web.jpeg",
                                    "https://wall-empire.s3.ap-south-1.amazonaws.com/home/Ad+Web+1.jpeg",
                                    "https://wall-empire.s3.ap-south-1.amazonaws.com/home/Ad+Web+2.jpeg",
                                    "https://wall-empire.s3.ap-south-1.amazonaws.com/home/Ad+Web+3.jpeg",
                                    "https://wall-empire.s3.ap-south-1.amazonaws.com/home/Ad+Web+4.jpeg",
                                    "https://wall-empire.s3.ap-south-1.amazonaws.com/home/Ad+Web+5.jpeg",
                                    "https://wall-empire.s3.ap-south-1.amazonaws.com/home/Ad+Web+6.jpeg"
                                ]}
                                imageStyle={'md:h-128 sm:h-60 h-48 w-full rounded-lg'}
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </motion.div>
    )

}