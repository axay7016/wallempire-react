import React, { useState, useEffect, useRef } from 'react'
import { Fragment } from 'react'
import { Disclosure, Dialog, Popover, Tab, Transition, Menu, FocusTrap } from '@headlessui/react'
import { MenuIcon, SearchIcon, XIcon } from '@heroicons/react/outline'
import { Link } from "react-router-dom";
import { ChevronDownIcon } from '@heroicons/react/solid';
import Logo from '../resources/images/WE-full-logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import useDynamicRefs from 'use-dynamic-refs';
import PremiumProducts from '../pages/PremiumProducts';

export default function Header() {
    const navigate = useNavigate();
    const [open, setopen] = useState(false)
    const [loggedinUser, setLoggedinUser] = useState(false)
    const [categories, setcategories] = useState([])
    const [getRef, setRef] = useDynamicRefs();
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
            setLoggedinUser(JSON.parse(localStorage.getItem('user')))
            setUser(true)
        }
        categoryhandler()
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

    const PremiumUser = () => {
        navigate("/premiumproducts")
    }

    const AdminUser = () => {
        navigate("/admin/user")
    }

    const AdminProduct = () => {
        navigate("/admin/product")
    }

    const Productinquiries = () => {
        navigate("/productinquiries")
    }

    const openhandleActive = () => {
        setopen(true);
    }

    const openhandleDeactive = () => {
        setopen(false);
    }

    const categoryhandler = () => {
        axios.get(process.env.REACT_APP_SERVER_API + "/category", {
            headers: {
                authorization: 'Basic d2FsbGVtcGlyZTp3YWxsZW1waXJl'
            }
        }).then(categoryRes => {
            if (categoryRes.status === 200) {
                var category = categoryRes.data.data
                var nav = []
                category.map(category => {
                    var sections = []
                    category['section'].map(section => {
                        return sections.push({
                            key: section._id,
                            id: section._id,
                            name: section.name,
                            items: [
                                section.items.map(item => {
                                    return {
                                        name: item.name, href: `/product-category/${item._id}`
                                    }
                                })
                            ]
                        })
                    })
                    return nav.push(JSON.parse(JSON.stringify({
                        key: category._id,
                        id: category._id,
                        name: category.name,
                        bgImage: 'bg-wallpaper',
                        featured: category.featuredProducts.map(category => {
                            return {
                                key: category._id,
                                href: '/',
                                imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                                imageSrc: category.postImage1,
                                name: category.postName,
                            }
                        }),
                        sections: sections,
                    })))
                })

                setcategories(nav);
            }
        })
    }

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="bg-white w-full shadow-sm z-50 fixed">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" open={open} className="fixed inset-0 flex z-50 lg:hidden" onClose={openhandleDeactive}>
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

                            {/* Links */}
                            <Tab.Group as="div" className="mt-2">
                                <div className="sticky border-b border-gray-200">
                                    <Tab.List className="shadow-xl -mb-px flex px-3 space-x-8 overflow-y-auto">
                                        {categories.map((category) => {
                                            return (category.sections.length != 0 ?
                                                <Tab
                                                    key={category._id}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'text-yellow-600 border-yellow-600' : 'text-gray-900 border-transparent',
                                                            'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab> : <Link key={category.name} to={`/category/${category.id}`} className="text-gray-700 hover:text-gray-800 items-center flex">
                                                    {category.name}
                                                </Link>
                                            )
                                        })}
                                    </Tab.List>
                                </div>
                                <Tab.Panels as={Fragment}>
                                    {categories.map((category) => (
                                        <Tab.Panel key={category._id} className="pt-10 pb-8 px-4 space-y-10">
                                            <div className="grid grid-cols-2 gap-x-4">
                                                {category.featured.map((item) => (
                                                    <div key={item.name} className="group relative text-sm">
                                                        <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                            <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                                                        </div>
                                                        <Link to={item.href} className="mt-6 block font-medium text-gray-900">
                                                            <span className="absolute z-10 inset-0" aria-hidden="true" />
                                                            {item.name}
                                                        </Link>
                                                        <p aria-hidden="true" className="mt-1">
                                                            Shop now
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                            {category.sections.map((section) => (
                                                <div key={section.name}>
                                                    <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                        {section.name}
                                                    </p>
                                                    <ul
                                                        aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                        className="mt-6 flex flex-col space-y-6"
                                                    >
                                                        {section.items[0].map((item) => (
                                                            <li key={item.name} className="flow-root">
                                                                <Link to={item.href} className="-m-2 p-2 block text-gray-500">
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>

                            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                {pages.map((page) => (
                                    <div key={page.name} className="flow-root">
                                        <Link to={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                                            {page.name}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            {
                                user ? <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                    {loggedinUser.user.role == 'user' ?
                                        <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                            <button onClick={PremiumUser} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                Premium Products
                                            </button>
                                        </div> :
                                        <><div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                            <button
                                                onClick={AdminUser}
                                                className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                Users
                                            </button>
                                        </div><div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                                <button
                                                    onClick={AdminProduct}
                                                    className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                    Products
                                                </button>
                                            </div>
                                            <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                                <button
                                                    onClick={Productinquiries}
                                                    className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                    Product Inquiries
                                                </button>
                                            </div>
                                        </>
                                    }

                                    <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <button onClick={Logout} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Logout
                                        </button>
                                    </div>
                                </div> :
                                    <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                        <div className="flow-root">
                                            <Link to="/signIn" className="-m-2 p-2 block font-medium text-gray-900">
                                                Dealer Login
                                            </Link>
                                        </div>
                                        <div className="flow-root">
                                            <Link to="/signUp" className="-m-2 p-2 block font-medium text-gray-900">
                                                Partner Us
                                            </Link>
                                        </div>
                                    </div>
                            }
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>

            <header className="md:absolute bg-white z-50 w-full shadow-2xl">
                {/* <p className="bg-yellow-400 h-10 flex items-center justify-center text-sm font-medium text-black px-4 sm:px-6 lg:px-8">
                    Drem - Design - Decore Your Place With WALL EMPIRE.
                </p> */}

                <nav aria-label="Top" className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 shadow-lg">
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
                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="h-full flex space-x-8">

                                    {categories.map((category, index) => {
                                        var categoryIndex = category.key;
                                        return (
                                            <Popover key={category.id} className="flex">
                                                {({ open }) => {
                                                    return (
                                                        <>
                                                            <div className="relative flex">
                                                                {category.sections.length > 0 ?
                                                                    <Popover.Button className={classNames(open
                                                                        ? 'border-yellow-600 text-yellow-600'
                                                                        : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                        'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                                                                    )}>
                                                                        <div
                                                                            ref={setRef(categoryIndex)}
                                                                            onClick={() => {
                                                                                setopen(!open)
                                                                            }}
                                                                        >
                                                                            {category.name}
                                                                        </div>
                                                                        <ChevronDownIcon className="h-5" />
                                                                    </Popover.Button> :
                                                                    <Link key={category.name} to={`/category/${category.id}`} className="text-gray-700 hover:text-gray-800 items-center flex">
                                                                        {category.name}
                                                                    </Link>}
                                                            </div>

                                                            <Transition
                                                                show={open}
                                                                as={Fragment}
                                                                enter="transition ease-out duration-200"
                                                                enterFrom="opacity-0"
                                                                enterTo="opacity-100"
                                                                leave="transition ease-in duration-150"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                            >

                                                                <Popover.Panel key={category._id} className="shadow-2xl absolute top-full inset-x-0 text-sm text-gray-500">

                                                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                                    <div key={category._id} className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                                    <div key={category._id} className={"relative bg-white bg-gradient-to-r bg-contain bg-right " + category.bgImage + " bg-no-repeat bg-right-bottom"}>
                                                                        <div className="max-w-7xl mx-auto px-8">
                                                                            <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                                                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                                    {category.featured.slice(0, 1).map((item) => (
                                                                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                                                                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                                                                <img
                                                                                                    src={item.imageSrc}
                                                                                                    alt={item.imageAlt}
                                                                                                    className="object-center object-cover"
                                                                                                />
                                                                                            </div>
                                                                                            <Link to={item.href} className="mt-6 block font-medium text-gray-900">
                                                                                                <span className="absolute z-10 inset-0" aria-hidden="true" />
                                                                                                {item.name}
                                                                                            </Link>
                                                                                            <p aria-hidden="true" className="mt-1">
                                                                                                Shop now
                                                                                            </p>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                                <div className="row-start-1 grid grid-cols-2 gap-y-10 gap-x-8 text-sm">
                                                                                    {category.sections.map((section) => (
                                                                                        <div key={section.name}>
                                                                                            <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                                                {section.name}
                                                                                            </p>
                                                                                            <ul
                                                                                                aria-labelledby={`${section.name}-heading`}
                                                                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                            >
                                                                                                {section.items.map(item => {
                                                                                                    return item.map((itemIndex, index) => (
                                                                                                        <li key={itemIndex.name} className="flex">
                                                                                                            <Link key={itemIndex.name} onClick={() => {
                                                                                                                getRef(categoryIndex)?.current?.click()
                                                                                                            }} to={itemIndex.href} className="hover:text-gray-800">
                                                                                                                {itemIndex.name}
                                                                                                            </Link>
                                                                                                        </li>
                                                                                                    ))
                                                                                                })}
                                                                                            </ul>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Popover.Panel>

                                                            </Transition>
                                                        </>
                                                    )
                                                }}
                                            </Popover>
                                        )
                                    })}

                                    {pages.map((page) => (
                                        <Link
                                            key={page.name}
                                            to={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </Popover.Group>

                            {
                                user ?
                                    <Disclosure as="nav" className="lg:items-center lg:justify-end ml-auto flex items-center">
                                        {({ open }) => (
                                            <>
                                                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ml-auto hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                                    <div className="relative flex items-center justify-between h-16">
                                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                                            {/* Profile dropdown */}
                                                            <Menu as="div" className="ml-3 relative ">
                                                                <div>
                                                                    <Menu.Button className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                                        <div className="lg:items-center lg:justify-end lg:space-x-6 userIcon">
                                                                            {/* <i className="fa-solid fa-bars"></i> */}
                                                                            <FontAwesomeIcon icon={faBars} />
                                                                            <FontAwesomeIcon icon={faCircleUser} />
                                                                        </div>
                                                                    </Menu.Button>
                                                                </div>
                                                                <Transition
                                                                    as={Fragment}
                                                                    enter="transition ease-out duration-100"
                                                                    enterFrom="transform opacity-0 scale-95"
                                                                    enterTo="transform opacity-100 scale-100"
                                                                    leave="transition ease-in duration-75"
                                                                    leaveFrom="transform opacity-100 scale-100"
                                                                    leaveTo="transform opacity-0 scale-95"
                                                                >
                                                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                        {loggedinUser.user.role == 'user' ?
                                                                            <Menu.Item>
                                                                                {({ active }) => (
                                                                                    <button
                                                                                        onClick={PremiumUser}
                                                                                        className={classNames(active ? 'bg-gray-100 w-full text-left' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}
                                                                                    >
                                                                                        Premium Products
                                                                                    </button>
                                                                                )}
                                                                            </Menu.Item>
                                                                            :
                                                                            <>
                                                                                <Menu.Item>
                                                                                    {({ active }) => (
                                                                                        <button
                                                                                            onClick={PremiumUser}
                                                                                            className={classNames(active ? 'bg-gray-100 w-full text-left' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}
                                                                                        >
                                                                                            Premium Products
                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>
                                                                                <Menu.Item>
                                                                                    {({ active }) => (
                                                                                        <button
                                                                                            onClick={AdminUser}
                                                                                            className={classNames(active ? 'bg-gray-100 w-full text-left' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}
                                                                                        >
                                                                                            Users
                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>
                                                                                <Menu.Item>
                                                                                    {({ active }) => (
                                                                                        <button
                                                                                            onClick={AdminProduct}
                                                                                            className={classNames(active ? 'bg-gray-100 w-full text-left' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}
                                                                                        >
                                                                                            Products
                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>
                                                                                <Menu.Item>
                                                                                    {({ active }) => (
                                                                                        <button
                                                                                            onClick={Productinquiries}
                                                                                            className={classNames(active ? 'bg-gray-100 w-full text-left' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}
                                                                                        >
                                                                                            Product Inquiries
                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            </>
                                                                        }

                                                                        <Menu.Item>
                                                                            {({ active }) => (
                                                                                <button
                                                                                    onClick={Logout}
                                                                                    className={classNames(active ? 'bg-gray-100 w-full text-left' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}
                                                                                >
                                                                                    Sign out
                                                                                </button>
                                                                            )}
                                                                        </Menu.Item>
                                                                    </Menu.Items>
                                                                </Transition>
                                                            </Menu>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </Disclosure> : <div className="ml-auto flex items-center">


                                        {/* <div className="flex lg:ml-6 md:space-x-6">
                                            <Link to="/" className="p-2 text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Search</span>
                                                <SearchIcon className="w-6 h-6" aria-hidden="true" />
                                            </Link>
                                        </div> */}

                                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                            <Link to="/signIn" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                Dealer Login
                                            </Link>
                                            <Link to="/signUp" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                Partner Us
                                            </Link>
                                        </div>
                                    </div>
                            }

                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}