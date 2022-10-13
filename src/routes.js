import Login from './pages/Login';
import Home from './pages/Home.js';
import Registration from './pages/Registration';
import ProductCategory from './pages/ProductCategory';
import ParentCategoryProduct from './pages/ParentCategoryProduct';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import User from './pages/User';
import Product from './pages/Product';
import FeatureProduct from './pages/FeatureProduct';
import Maintain from './pages/Maintain'
import TermsCondition from './pages/TermsCondition'
import PremiumProducts from './pages/PremiumProducts'
import ProductDetails from './pages/ProductDetails';
import ProductInquiry from './pages/ProductInquiry';

var routers = []

if (process.env.REACT_APP_MODE == "true") {
    routers.push(
        { path: '/', element: <Home />, },
        { path: '/product-category/:subcategory', element: <ProductCategory />, },
        { path: '/category/:subcategory', element: <ParentCategoryProduct />, },
        { path: '/aboutus', element: <AboutUs />, },
        { path: '/contactus', element: <ContactUs />, },
        { path: '/signIn', element: <Login /> },
        { path: '/signUp', element: <Registration /> },
        { path: '/forgetPassword', element: <Login /> },
        { path: '/admin/user', element: <User /> },
        { path: '/admin/product', element: <Product />, },
        { path: '/admin/feature-product', element: <FeatureProduct />, },
        { path: '/termsCondition', element: <TermsCondition />, },
        { path: '/premiumproducts', element: <PremiumProducts />, },
        { path: '/productdetails', element: <ProductDetails />, },
        { path: '/productinquiries', element: <ProductInquiry />, },
    )
} else {
    routers.push(
        { path: '/', element: <Maintain />, },
    )
}

export default routers;