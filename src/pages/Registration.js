import React, { useState } from 'react'
import Header from '../components/Header.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";
import Footer from '../components/Footer.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
    const navigate = useNavigate();
    const [username, setusername] = useState('')
    const [company, setcompany] = useState('')
    const [gst, setGst] = useState('')
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')


    const usernamehandleChange = (e) => {
        setusername(e.target.value)
    }

    const companyhandleChange = (e) => {
        setcompany(e.target.value)
    }

    const gsthandleChange = (e) => {
        setGst(e.target.value)
    }

    const phonehandleChange = (e) => {
        setphone(e.target.value)
    }

    const emailhandleChange = (e) => {
        setemail(e.target.value)
    }

    const passwordhandleChange = (e) => {
        setpassword(e.target.value)
    }

    const confirmPasswordhandleChange = (e) => {
        setconfirmPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        axios.post(process.env.REACT_APP_SERVER_API + '/signUp', {
            username: username,
            phoneNumber: phone,
            companyName: company,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }, {
            headers: {
                authorization: 'Basic d2FsbGVtcGlyZTp3YWxsZW1waXJl'
            }
        })
            .then(function (response) {
                navigate("/signIn");

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
                    <div className="max-w-80 transform duration-200 hover:scale-110 cursor-pointer">
                        <LazyLoadImage
                            className="h-screen"
                            alt="Loading Image"
                            src="https://wall-empire.s3.ap-south-1.amazonaws.com/Other_Image/02+Nature+Wallpaper.jpg" />
                    </div>
                </div>
                <div className="lg:w-1/2 xl:max-w-screen-sm">
                    <div className="mt-0 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                        <div className="cursor-pointer flex items-center">
                        </div>
                    </div>
                    <div className="mt-24 md:mt-24 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-24 xl:px-24 xl:max-w-2xl">
                        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-yellow-400 to-red-600">Welcome</h1>
                        <span>Enter your details and join with <b>WALL EMPIRE</b>.</span>
                        <div className="mt-12">
                            <form onSubmit={e => { handleSubmit(e) }}>
                                <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Username <span className="text-red-600">*</span></div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" name='username' value={username} onChange={usernamehandleChange} type="text" placeholder="Enter your username" required />
                                </div>
                                <div className="mt-8">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Company Name <span className="text-red-600">*</span></div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" name='company' value={company} onChange={companyhandleChange} type="text" placeholder="Enter your company name" required />
                                </div>
                                <div className="mt-8">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">GST Number <span className="text-red-600">*</span></div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" name='company' value={gst} onChange={gsthandleChange} type="text" placeholder="Enter your GST number" required />
                                </div>
                                <div className="mt-8">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Phone Number <span className="text-red-600">*</span></div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" name='phone' value={phone} onChange={phonehandleChange} type="number" placeholder="1234567890" required />
                                </div>
                                <div className="mt-8">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address <span className="text-red-600">*</span></div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" name='email' value={email} onChange={emailhandleChange} type="email" placeholder="xxx@gmail.com" required />
                                </div>
                                <div className="mt-8">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Password <span className="text-red-600">*</span></div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" name='password' value={password} onChange={passwordhandleChange} type="password" placeholder="Enter your password" required />
                                </div>
                                <div className="mt-8">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Confirm Password <span className="text-red-600">*</span></div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" name='confirmPassword' value={confirmPassword} onChange={confirmPasswordhandleChange} type="password" placeholder="Enter your confirm password" required />
                                </div>
                                <div className="mt-8">
                                    <button type='submit' className="bg-yellow-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-yellow-600 shadow-lg">
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                            <div className="mt-8 mb-8 text-sm font-display font-semibold text-gray-700 text-center">
                                Already have an account ? <Link to="/signIn" className="cursor-pointer text-yellow-600 hover:text-yellow-800">Sign in</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}