import { useEffect, useState } from 'react'
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PremiumProducts({ history }) {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [isDataNull, setIsDataNull] = useState(true);
    const [userData] = useState(JSON.parse(localStorage.getItem('user')));

    const getProduct = async () => {
        if (userData == null) {
            navigate('/')
        } else {
            const response = await axios.get(process.env.REACT_APP_SERVER_API + `/product?productStatus=premium&limit=${limit}&page=${page}`, {
                headers: {
                    authorization: `Bearer ${userData.access_token}`
                }
            })
            if (response.data.data?.post == null) {
                setIsDataNull(true)
            }
            if (response.status == 200) {
                if (response?.data?.data?.post) {
                    setProduct([...product, ...response?.data?.data?.post])
                    setIsDataNull(false)
                }
            }
            setIsFetching(false);
        }
    }

    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(0)
    const [limit] = useState(20)

    useEffect(() => {
        getProduct()
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
    }, [isFetching]);

    function handleScroll() {
        const { innerHeight } = window;
        if ((window.pageYOffset + innerHeight) == document.body.scrollHeight) {
            setIsFetching(true)
        }
        return;
    }

    useEffect(() => {
        getProduct()
    }, [page])

    function fetchMoreListItems() {
        setTimeout(() => {
            var start = page
            start = start + 1
            setPage(start)
        }, 2000);
    }

    return (
        <div className='h-screen'>
            <Header />

            <div className="pl-4 pr-4 pt-32 bg-gray-200">
                <div className="mb-1">
                    <div className="font-extrabold text-2xl text-center"> Premium Products</div>
                </div>
                {isDataNull ?
                    <div className="text-center p-5 h-screen">
                        <div className="text-base"> No Premium products available</div>
                    </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                        {product.map((item, index) => {
                            return (
                                <div key={index} className="rounded-xl shadow-2xl bg-gray-200 overflow-hidden divide-black">
                                    <div className="overflow-hidden pb-2 h-56 flex justify-center bg-neutral-400">
                                        <img src={item.postImage1} className='h-56' />
                                    </div>
                                    <div className="pl-2 overflow-hidden">
                                        <b>Name : </b>{item.postName}
                                    </div>
                                    <div className="pl-2 overflow-hidden pb-2">
                                        <b>Description : </b>{item.description}
                                    </div>
                                    <div className="divide-x divide-gray-400"></div>
                                    <div className="grid grid-cols-3 divide-x divide-gray-400 pb-2">
                                        <div className="pl-2 overflow-hidden">
                                            <div className="w-full flex justify-center font-semibold">
                                                Status
                                            </div>
                                            <div className="w-full flex justify-center">
                                                {item.productStatus}
                                            </div>
                                        </div>
                                        <div className="pl-2 overflow-hidden">
                                            <div className="w-full flex justify-center font-semibold">
                                                Category
                                            </div>
                                            <div className="w-full flex justify-center">
                                                {item.category.name}
                                            </div>
                                        </div>
                                        <div className="pl-2 overflow-hidden">
                                            <div className="w-full flex justify-center font-semibold">
                                                Sub Category
                                            </div>
                                            <div className="w-full flex justify-center">
                                                {item.sub_category.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
                {isFetching && !isDataNull && (<div class="flex justify-center items-center">
                    <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full mb-4" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>)}
            </div>
            <Footer />
        </div >
    )
}
