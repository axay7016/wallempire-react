import React from 'react'
import { Link } from "react-router-dom";
import Logo from '../resources/images/WE-full-logo.png'

function Footer() {
    return (
        <footer className="text-gray-600 body-font shadow-2xl">
            <div className="container px-5 py-10 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                    <Link
                        to="/"
                        className=" flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
                    >
                        <i className="fas fa-cubes fa-lg text-purple-500"></i>
                        <img src={Logo} alt="wallempire logo" />
                    </Link>
                </div>
                <div
                    className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center"
                >
                    <div className="lg:w-1/4 md:w-1/2 w-1/2 px-4">
                        <h2
                            className=" title-font font-medium text-black tracking-widest text-sm mb-3"
                        >
                            PRODUCT
                        </h2>
                        <nav className="list-none mb-5 space-y-1">
                            <li>
                                <Link to="/product-category/6261f6cdac39520d1d137ab7" className="text-gray-600 hover:text-gray-800"
                                >Wallpaper</Link>
                            </li>
                            <li>
                                <Link to="/product-category/626d1b671a92c83f43436973" className="text-gray-600 hover:text-gray-800"
                                >Blinds</Link>
                            </li>
                            <li>
                                <Link to="/category/626d08151a92c83f43436956" className="text-gray-600 hover:text-gray-800"
                                >Curtain</Link>
                            </li>
                            <li>
                                <Link to="/category/626d0347e1d7c75cabb2c7f9" className="text-gray-600 hover:text-gray-800"
                                >Cushions</Link>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-1/2 px-4">
                        <h2
                            className=" title-font font-medium text-gray-900 tracking-widest text-sm mb-3"
                        >
                            CORPORATE
                        </h2>
                        <nav className="list-none mb-5 space-y-1">
                            <li>
                                <Link to="/aboutus" className="text-gray-600 hover:text-gray-800"
                                >About Us</Link>
                            </li>
                            <li>
                                <Link to="/termsCondition" className="text-gray-600 hover:text-gray-800"
                                >Terms &amp; Conditions</Link>
                            </li>
                            <li>
                                <Link to="/contactus" className="text-gray-600 hover:text-gray-800"
                                >Career</Link>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-1/2 px-4">
                        <h2
                            className=" title-font font-medium text-gray-900 tracking-widest text-sm mb-3"
                        >
                            CUSTOMERS
                        </h2>
                        <nav className="list-none mb-5 space-y-1">
                            <li>
                                <Link to="/contactus" className="text-gray-600 hover:text-gray-800"
                                >Contact Us</Link>
                            </li>
                            {/* <li>
                                <Link to="" className="text-gray-600 hover:text-gray-800"
                                >Sitemap</Link>
                            </li> */}
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-1/2 px-4">
                        <h2
                            className=" title-font font-medium text-gray-900 tracking-widest text-sm mb-3"
                        >
                            GET IN TOUCH
                        </h2>
                        <nav className="list-none mb-5 space-y-1">
                            <ul>
                                <li className='flex'>
                                    <a target='_blank' href="https://www.facebook.com/wall.empire7/" className="ml-3 text-gray-500 h-10">
                                        <i><svg className='h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg></i>
                                    </a>

                                    <a target='_blank' href="https://www.linkedin.com/company/wall-empire-pvt-ltd/" className="ml-4 text-gray-500">
                                        <i><svg className='h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" /></svg></i>
                                    </a>

                                    <a target='_blank' href="https://www.instagram.com/wallempire_decor/" className="ml-4 text-gray-500">
                                        <i><svg className='h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg></i>
                                    </a>
                                    <a target='_blank' href="https://www.indiamart.com/wall-empire-private-limited/" className="ml-4 text-gray-500">
                                        <i><svg className='h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 64.01v384c0 17.67-14.31 32-32 32s-32-14.33-32-32V169.7l-133.4 200.1c-11.88 17.81-41.38 17.81-53.25 0L64 169.7v278.3c0 17.67-14.31 32-32 32s-32-14.33-32-32v-384c0-14.09 9.219-26.55 22.72-30.63c13.47-4.156 28.09 1.141 35.91 12.88L224 294.3l165.4-248.1c7.812-11.73 22.47-17.03 35.91-12.88C438.8 37.47 448 49.92 448 64.01z" /></svg></i>
                                    </a>
                                    <a target='_blank' href="https://in.pinterest.com/wallempire_decor7/_created/" className="ml-4 text-gray-500">
                                        <i><svg className='h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/></svg></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 items-center">
                <div
                    className=" container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row"
                >
                    <p className="text-gray-500 text-sm text-center sm:text-left">
                        © 2021 Copyright:
                        <Link
                            to="/"
                            className="text-gray-600 ml-1"
                        >WallEmpire</Link>
                    </p>
                    <span
                        className=" inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start"
                    >
                        <Link to="" className="text-gray-500">
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link to="" className="ml-3 text-gray-500">
                            <i className="fab fa-twitter"></i>
                        </Link>
                        <Link to="" className="ml-3 text-gray-500">
                            <i className="fab fa-linkedin-in"></i>
                        </Link>
                        <Link to="" className="ml-3 text-gray-500">
                            <i className="fab fa-youtube"></i>
                        </Link>
                        <Link to="" className="ml-3 text-gray-500">
                            <i className="fab fa-instagram"></i>
                        </Link>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
