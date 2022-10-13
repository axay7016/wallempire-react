import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, XIcon } from '@heroicons/react/outline'
import { Link } from "react-router-dom";
import { ChevronDownIcon } from '@heroicons/react/solid';
import Logo from '../resources/images/WE-full-logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate  = useNavigate();
    const [open, setopen] = useState(false)
    const [categories, setcategories] = useState([])
    const [pages, setpages] = useState([
        {
            name: 'Contact Us',
            href: '/contactus'
        },
        {
            name: 'About Us',
            href: '/aboutus'
        }
    ])
    const [user, setUser] = useState(false)

    const authenticate = () => {
        return new Promise(resolve => setTimeout(resolve, 2000))
    }
    useEffect(() => {
        if (localStorage.getItem('user') != null) {
            setUser(true)
            
        }
        authenticate().then(() => {
            const ele = document.getElementById('progress-indicator')
            if (ele) {
                ele.classList.add('available')
                setTimeout(() => {
                    // ele.outerHTML = ''
                }, 2000)
            }
        })
    }, [user])

    const Logout = () => {
        localStorage.removeItem('user')
        setUser(false)
        navigate('/')
    }
    const openhandleActive = () => {
        setopen(true);
    }

    const openhandleDeactive = () => {
        setopen(false);
    }


    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }


    return (
        <div className="bg-white w-full shadow-sm z-50">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-50 lg:hidden" onClose={openhandleDeactive}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative max-w-2xl w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                            <div className="px-4 pt-5 pb-2 flex">
                                <button
                                    type="button"
                                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                                    onClick={openhandleDeactive}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                            </div>
                            
                            {
                                user ? <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <button onClick={Logout} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                        Logout
                                    </button>

                                </div>
                            </div> :
                                    ""
                            }
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>

            <header className="md:absolute bg-white z-50 w-full">
                <p className="bg-yellow-400 h-10 flex items-center justify-center text-sm font-medium text-black px-4 sm:px-6 lg:px-8">
                    Drem - Design - Decore Your Place With WALL EMPIRE.
                </p>

                <nav aria-label="Top" className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="h-16 flex items-center">
                            <button
                                type="button"
                                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                                onClick={openhandleActive}
                            >
                                <span className="sr-only">Open menu</span>
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link to="/">
                                    <span className="sr-only">{process.env.REACT_APP_NAME}</span>
                                    <img
                                        className="h-8 w-auto"
                                        src={Logo}
                                        alt="wallempire logo"
                                    />
                                </Link>
                            </div>

                            {
                                user ? <div className="ml-auto flex items-center">
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <button onClick={Logout} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Logout
                                        </button>

                                    </div>
                                </div> : ''
                            }

                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}