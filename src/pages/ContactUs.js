import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

export default function ContactUs() {
    window.scrollTo(0, 0);
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setemail] = useState('');
    const [enquiryDetails, setEnquiryDetails] = useState('');
    const navigate = useNavigate();

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleContactNumber = (e) => {
        setContactNumber(e.target.value)
    }

    const handleEmail = (e) => {
        setemail(e.target.value)
    }

    const handleDetails = (e) => {
        setEnquiryDetails(e.target.value)
    }

    const Onsubmit = (e) => {
        let token = 'Basic d2FsbGVtcGlyZTp3YWxsZW1waXJl'
        let userData = JSON.parse(localStorage.getItem('user'));
        if (userData != null) {
            token = `Bearer ${userData.access_token}`
        }
        axios.post(process.env.REACT_APP_SERVER_API + '/enquiry', {
            name: name,
            contact_number: contactNumber,
            email: email,
            enquiry_details: enquiryDetails
        }, {
            headers: {
                authorization: token
            }
        })
            .then(function (response) {
                navigate("/");

            })
            .catch(function (error) {
            });
        e.preventDefault();
    }

    return (
        <div>
            <Header />
            <div className="w-full md:bg-canvas bg-cover bg-no-repeat bg-right-bottom">
                <div className="sm:w-full md:w-full lg:w-2/3 xl:w-1/2 h-full md:p-36 p-8 pt-28">
                    <div className='p-10 md:pt-18 bg-white rounded-3xl shadow-2xl'>
                        <div className='grid'>
                            <div className='md:w-1/2 mb-10'>
                                <h1 className='text-xl font-bold'>Contact Us</h1>
                            </div>
                        </div>
                        <div className="grid grid-flow-col gap-4">
                            <form onSubmit={e => { Onsubmit(e) }}>
                                <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Name <span className="text-red-600">*</span></div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" name='name' value={name} onChange={handleName} type="text" placeholder="Enter your Name" required />
                                </div>
                                <div className="mt-8">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Email <span className="text-red-600">*</span></div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" name='email' value={email} onChange={handleEmail} type="text" placeholder="Enter your Email" required />
                                </div>
                                <div className="mt-8">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Phone Number <span className="text-red-600">*</span></div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" name='phone' value={contactNumber} onChange={handleContactNumber} type="number" placeholder="Enter your Contact Number" required />
                                </div>
                                <div className="mt-8">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Enquiry Details<span className="text-red-600">*</span></div>
                                    <textarea className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500" col='3' row='5' onChange={handleDetails} value={enquiryDetails} placeholder="Enquiry Details"></textarea>
                                </div>

                                <div className="mt-8">
                                    <button type='submit' className="bg-yellow-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-yellow-600 shadow-lg">
                                        Let Get Touch
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}