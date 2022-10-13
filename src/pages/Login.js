import React, { useState } from 'react'
import Header from '../components/Header.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";
import Footer from '../components/Footer.js';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


export default function Login() {
    const search = useLocation().search;
    const redirect = new URLSearchParams(search).get('redirect');
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate();

    const emailhandleChange = (event) => {
        setemail(event.target.value);
    }

    const passwordhandleChange = (event) => {
        setpassword(event.target.value);
    }

    const handleSubmit = (e) => {
        axios.post(process.env.REACT_APP_SERVER_API + '/signIn', {
            email: email,
            password: password,
        }, {
            headers: {
                authorization: 'Basic d2FsbGVtcGlyZTp3YWxsZW1waXJl'
            }
        })
            .then(function (response) {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                if (response.data.data.user.role == 'admin') {
                    navigate("/admin/user");
                } else {
                    if (redirect != null)
                        navigate(`${redirect}`);
                    else
                        navigate("/");
                }
            })
            .catch(function (error) {
            });
        e.preventDefault();
    }

    return (
        <div>
            <Header />
            <div className="lg:flex">
                <div className="hidden lg:flex items-center justify-center flex-1 h-screen overflow-hidden">
                    <div className="max-w-80 transform duration-200 hover:scale-105 cursor-pointer">
                        <LazyLoadImage
                            className="h-screen"
                            alt="Loading Image"
                            src="https://wall-empire.s3.ap-south-1.amazonaws.com/Other_Image/06+Zebra+Blind.jpg" />
                    </div>
                </div>
                <div className="lg:w-1/2 xl:max-w-screen-sm">
                    <div className="px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                        <div className="cursor-pointer flex items-center">
                        </div>
                    </div>
                    <div className="mt-24 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-yellow-400 to-red-600">Welcome Back</h1>
                        <span>Enter your email and password to sign in</span>
                        <div className="mt-12">
                            <form onSubmit={e => { handleSubmit(e) }}>
                                <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" value={email} onChange={emailhandleChange} type="email" placeholder="xxx@gmail.com" required />
                                </div>
                                <div className="mt-8">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                                            Password
                                        </div>
                                        <div>
                                            <Link to="/forgetPassword" className="text-xs font-display font-semibold text-yellow-600 hover:text-yellow-800 cursor-pointer">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    </div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" value={password} onChange={passwordhandleChange} type="password" placeholder="Enter your password" required />
                                </div>
                                <div className="mt-10">
                                    <button type="submit" className="bg-yellow-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-yellow-600 shadow-lg">
                                        Sign In
                                    </button>
                                </div>
                            </form>
                            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                                Don't have an account ? <Link to="/signUp" className="cursor-pointer text-yellow-600 hover:text-yellow-800">Sign up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}
