import Footer from "../components/Footer";
import Header from "../components/Header";
import { StyleRoot } from "radium";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductInquiry() {
    const [inquiries, setInquiries] = useState([]);
    const navigate = useNavigate()
    const [userData] = useState(JSON.parse(localStorage.getItem("user")));
    const [userEmail, setUserEmail] = useState();

    const getInquiries = async () => {
        setUserEmail(user.user.email)
        const setInquiriesRes = await axios.get(
            process.env.REACT_APP_SERVER_API + `/enquiry/product`,
            {
                headers: {
                    authorization: "Basic d2FsbGVtcGlyZTp3YWxsZW1waXJl",
                },
            }
        );
        if (setInquiriesRes.status === 200) {
            setInquiries(setInquiriesRes.data.data.enquiryProduct);
        }
    };
 
    const getUserInquiries = async () => {
        const setInquiriesRes = await axios.get(
            process.env.REACT_APP_SERVER_API + `/enquiry/product?user=${userEmail}`,
            {
                headers: {
                    authorization: "Basic d2FsbGVtcGlyZTp3YWxsZW1waXJl",
                },
            }
        );
        if (setInquiriesRes.status === 200) {
            setInquiries(setInquiriesRes.data.data.enquiryProduct);
        }
    };

    useEffect(() => {
        pageProcess();
    }, []);

    const pageProcess = async () => {
        setInquiries([]);
        await getInquiries();
    };

    const navigateToProductPage = (item) => {
        navigate(`/productdetails?id=${item.product_id}&category=main`)
    }

    return (
        <StyleRoot>
            <Header />
            <div className="max-w-full mx-auto h-screen pt-24 px-6">
                <div className="flex flex-col">
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden ">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left">Product Name</th>
                                            <th className="py-3 px-6 text-left">User name</th>
                                            <th className="py-3 px-6 text-center">Phone</th>
                                            <th className="py-3 px-6 text-center">Email</th>
                                            <th className="py-3 px-6 text-center">Height</th>
                                            <th className="py-3 px-6 text-center">Width</th>
                                            <th className="py-3 px-6 text-center">Dimension</th>
                                            <th className="py-3 px-6 text-center">Description</th>
                                            <th className="py-3 px-6 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light">
                                        {inquiries?.map((item, index) => {
                                            return (
                                                <tr
                                                    className="border-b border-gray-200 hover:bg-gray-100"
                                                    key={index}
                                                >
                                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <span className="font-medium">WE-KK-0001</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        <span className="py-1 px-3 rounded-full">
                                                            {item.name}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <span className="py-1 px-3 rounded-full">
                                                            {item.name}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <span className="py-1 px-3 rounded-full">
                                                            {item.email}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <span className="py-1 px-3 rounded-full">
                                                            {item.height}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <span className="py-1 px-3 rounded-full">
                                                            {item.width}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <span className="py-1 px-3 rounded-full">
                                                            {item.dimension}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-6 text-center w-96 flex">
                                                        <span className="py-1 px-3 rounded-full">
                                                            {item.instruction}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="flex item-center justify-center cursor-pointer" onClick={() => navigateToProductPage(item)}>
                                                            <div className="w-4 mr-2 transform hover:text-yellow-400 hover:scale-110">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        stroke-width="2"
                                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    />
                                                                    <path
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        stroke-width="2"
                                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <nav
                                    className="flex justify-between items-center py-4 px-6"
                                    aria-label="Table navigation"
                                >
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        Showing{" "}
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            1-10
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {inquiries.length}
                                        </span>
                                    </span>
                                    <div className="flex justify-end">
                                        <nav aria-label="Page navigation example">
                                            <ul className="flex list-style-none">
                                                <li className="page-item disabled">
                                                    <a
                                                        className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500 pointer-events-none focus:shadow-none"
                                                        href="#"
                                                        tabindex="-1"
                                                        aria-disabled="true"
                                                    >
                                                        Previous
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a
                                                        className="page-link relative block py-1.5 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 rounded-full text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                                                        href="#"
                                                    >
                                                        1 <span className="visually-hidden">(current)</span>
                                                    </a>
                                                </li>
                                                <li className="page-item active">
                                                    <a
                                                        className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                                        href="#"
                                                    >
                                                        2
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a
                                                        className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                                        href="#"
                                                    >
                                                        3
                                                    </a>
                                                </li>
                                                <li className="page-item">
                                                    <a
                                                        className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                                        href="#"
                                                    >
                                                        Next
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </StyleRoot>
    );
}
