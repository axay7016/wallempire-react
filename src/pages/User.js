import React, { useState, useEffect } from 'react'
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';

export default function User() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [pagination, setPagination] = useState([]);
    const [itemOffset, setItemOffset] = useState(20);

    const active = (id, event) => {
        let userData = JSON.parse(localStorage.getItem('user'));
        axios.patch(process.env.REACT_APP_SERVER_API + '/activate', {
            user_id: id,
            active: event.target.checked,
            page: pageCount,
            limit: itemOffset
        }, {
            headers: {
                authorization: `Bearer ${userData.access_token}`
            }
        }).then(function (response) {
            getUser()
        }).catch(function (error) {
        });
    };
    const ban = (id, event) => {
        let userData = JSON.parse(localStorage.getItem('user'));
        axios.patch(process.env.REACT_APP_SERVER_API + '/activate', {
            user_id: id,
            ban: event.target.checked,
            page: pageCount,
            limit: itemOffset
        }, {
            headers: {
                authorization: `Bearer ${userData.access_token}`
            }
        }).then(function (response) {
            getUser()
        }).catch(function (error) {
        });
    };
    useEffect(() => {
        getUser()
    }, [pageCount])

    const getUser = () => {
        let userData = JSON.parse(localStorage.getItem('user'));
        if (userData == null) {
            navigate('/')
        } else {
            axios.get(process.env.REACT_APP_SERVER_API + '/users?page=' + pageCount + '&limit=' + itemOffset, {
                headers: {
                    authorization: `Bearer ${userData.access_token}`
                }
            }).then(function (response) {
                setUser(response.data.data.user)
                paginationPages(response.data.data.page)
                setCurrentItems(response.data.data.currentPage)
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

    return (
        <div>
            <Header />
            <div className="pl-4 pr-4 pt-32 bg-gray-200">
                <div className="mb-1">
                    <div className="font-extrabold text-2xl text-center"> USER SECTION</div>
                    <div className="text-center">Creation And Modification Part Of User</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5">
                    {user.map((item, index) => {
                        return (
                            <div key={index} className="rounded-xl shadow-2xl bg-gray-200 overflow-hidden divide-black">
                                <div className="overflow-hidden pb-2 pt-5 justify-center flex">
                                    <div className='w-28 h-28 rounded-full bg-gray-500 justify-center flex items-center text-5xl text-white'>
                                        {item.companyName[0].toUpperCase()}
                                    </div>
                                </div>

                                <div className="overflow-hidden justify-center flex">
                                    {item.companyName}
                                </div>

                                <div className="overflow-hidden pb-2 justify-center flex">
                                    {item.email}
                                </div>

                                <div className="grid grid-cols-2 divide-x divide-gray-400 pb-2">
                                    <div className="pl-2 overflow-hidden">
                                        <div className="w-full flex justify-center font-semibold">
                                            USERNAME
                                        </div>
                                        <div className="w-full flex justify-center">
                                            {item.username}
                                        </div>
                                    </div>
                                    <div className="pl-2 overflow-hidden">
                                        <div className="w-full flex justify-center font-semibold">
                                            PHONE
                                        </div>
                                        <div className="w-full flex justify-center">
                                            {item.phoneNumber}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 divide-x divide-gray-400 pb-2">
                                    <div className="pl-2 overflow-hidden">
                                        <div className="w-full flex justify-center">
                                            <Switch
                                                checked={item.active}
                                                onChange={(e) => active(item._id, e)}
                                                name={item.username}
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                        </div>
                                        <div className="w-full flex justify-center font-semibold">
                                            Active
                                        </div>
                                    </div>
                                    <div className="pl-2 overflow-hidden">
                                        <div className="w-full flex justify-center">
                                            <Switch
                                                checked={item.ban}
                                                onChange={(e) => ban(item._id, e)}
                                                name={item.username}
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                        </div>
                                        <div className="w-full flex justify-center font-semibold">
                                            Block
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-800 w-full text-white text-center">
                                    Active
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* <table>
                    <thead>
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Company Name</th>
                            <th className="p-4">Phone Number</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Active</th>
                            <th className="p-4">Ban</th>
                        </tr>
                    </thead>
                    <thead>
                        {user.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="p-4">{item.username}</td>
                                    <td className="p-4">{item.companyName}</td>
                                    <td className="p-4">{item.phoneNumber}</td>
                                    <td className="p-4">{item.email}</td>
                                    <td className="p-4"><Switch
                                        checked={item.active}
                                        onChange={(e) => active(item._id, e)}
                                        name={item.username}
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    /></td>
                                    <td className="p-4"><Switch
                                        checked={item.ban}
                                        onChange={(e) => ban(item._id, e)}
                                        name={item.username}
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    /></td>
                                </tr>
                            )
                        })}
                    </thead>
                </table> */}
                {/* <div>
                    {currentItems == 1 ? '' : <button onClick={()=>setPageCount(currentItems-1)} >Previous</button>}
                    {
                        pagination.map((count,index) => (
                            <span key={index} className='pagination' onClick={()=>setPageCount(count+1)}>{count+1}</span>
                        ))
                    }
                    {currentItems == pagination.length ? '' : <button onClick={()=>setPageCount(currentItems+1)}>Next</button>}
                    
                </div> */}
            </div>
            <Footer />
        </div >
    )
}
