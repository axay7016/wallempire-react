import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { X } from "heroicons-react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { fadeIn } from "react-animations";
import Radium, { StyleRoot } from "radium";
import ImageFadeIn from "../components/Animation/ImageFadeIn";
import ProgressiveImage from "react-progressive-graceful-image";
import { style, width } from "@mui/system";
import Carousel from "react-multi-carousel";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import SweetAlert from "react-bootstrap-sweetalert";

export default function ProductDetails() {
  const search = useLocation().search;
  const location = useLocation();
  const id = new URLSearchParams(search).get("id");
  const category = new URLSearchParams(search).get("category");
  const { subcategory } = useParams();
  const navigate = useNavigate();
  const [navBar, setnavBar] = useState(false);
  const [initImage, setInitImage] = useState("");
  const [tempItem1, settempItem1] = useState("");
  const [tempItem2, settempItem2] = useState("");
  const [tempItem3, settempItem3] = useState("");
  const [tempItem4, settempItem4] = useState("");
  const [product, setproduct] = useState([]);
  const [productName, setProductName] = useState();
  const [open, setOpen] = React.useState(false);
  const [fullName, setFullName] = React.useState();
  const [phone, setPhone] = React.useState();
  const [email, setEmail] = React.useState();
  const [height, setHeight] = React.useState();
  const [description, setDescription] = React.useState();
  const [width, setWidth] = React.useState();
  const [dimension, setDimension] = React.useState();
  const [alert, setAlert] = React.useState(false);

  const [userData] = useState(JSON.parse(localStorage.getItem("user")));
  const getProduct = async () => {
    const productRes = await axios.get(
      process.env.REACT_APP_SERVER_API + `/product?product_id=${id}`,
      {
        headers: {
          authorization: "Basic d2FsbGVtcGlyZTp3YWxsZW1waXJl",
        },
      }
    );
    if (productRes.status === 200) {
      setproduct(productRes.data.data.post);
      setInitImage(productRes.data.data.post[0]?.postImage1);
      setImage(productRes.data.data.post[0]?.postImage1);
      settempItem2(
        productRes.data.data.post[0]?.postImage2
          ? productRes.data.data.post[0]?.postImage2
          : ""
      );
      settempItem3(
        productRes.data.data.post[0]?.postImage3
          ? productRes.data.data.post[0]?.postImage3
          : ""
      );
      settempItem4(
        productRes.data.data.post[0]?.postImage4
          ? productRes.data.data.post[0]?.postImage4
          : ""
      );
      setProductName(productRes.data.data.post[0]?.postName);
    }
  };
  useEffect(() => {
    pageProcess();
  }, []);

  const pageProcess = async () => {
    await setproduct([]);
    await getProduct();
  };

  const setImage = (image) => {
    settempItem1(image);
  };

  const styles = {
    fadeIn: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeIn, "fadeIn"),
    },
  };

  const goBack = () => {
    if (category == "main")
      navigate(`/product-category/${product[0]?.sub_category?._id}`);
    else navigate(`/category/${product[0]?.sub_category?._id}`);
  };

  const handleOpen = () => {
    setOpen(true);
    if (userData == null)
      navigate(`/signIn?redirect=${location.pathname}${location.search}`);
  };

  const handleSubmit = (e) => {

    let data = {
      "product_id": id,
      "name": fullName,
      "contact_number": phone,
      "email": email,
      "height": Number(height),
      "width": Number(width),
      "instruction": description,
      "dimension": Number(dimension)
    };

    axios.post(process.env.REACT_APP_SERVER_API + '/enquiry/product', data, {
      headers: {
        authorization: `Bearer ${userData.access_token}`
      }
    })
      .then(function (response) {
        setAlert(true);
        handleClose()
      })
      .catch(function (error) {
      });
    e.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleHeight = (e) => {
    setHeight(e.target.value);
  };

  const handleWidth = (e) => {
    setWidth(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDimension = (e) => {
    setDimension(e.target.value);
  };

  const onConfirm = () => {
    setAlert(false);
  };
  return (
    <StyleRoot>
      <Header />
      {alert ? (
        <SweetAlert
          success
          showCancel={false}
          title="Inquiry added"
          onConfirm={onConfirm}
          showConfirm={false}
          timeout={1000}
        ></SweetAlert>
      ) : null}

      <Modal open={open} disableBackdropClick={true} onClose={handleClose}>
        <div className="container mx-auto">
          <div className="flex justify-center m-0 p-0 md:mt-24 h-screen md:h-full">
            <div className="w-full flex">
              <div
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover bg-no-repeat rounded-l-lg"
                style={{ backgroundImage: `url(${tempItem2})` }}
              ></div>
              <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                <div className="flex justify-end">
                  <X
                    onClick={() => handleClose()}
                    className="cursor-pointer border-2 top-8 right-6 rounded-full border-white"
                  />
                </div>
                <h3 className="pt-4 text-2xl text-center font-semibold">
                  Create Inquiry
                </h3>
                <form
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      for="fullName"
                    >
                      Full Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="fullName"
                      type="text"
                      placeholder="John dave"
                      onChange={(e) => handleFullName(e)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      for="phone"
                    >
                      Phone Number
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="phone"
                      maxLength={10}
                      type="number"
                      placeholder="8596746285"
                      onChange={(e) => handlePhone(e)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      for="email"
                    >
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="xxx@gmail.com"
                      onChange={(e) => handleEmail(e)}
                      required
                    />
                  </div>
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        for="height"
                      >
                        Image Height <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="height"
                        type="number"
                        placeholder="1024"
                        onChange={(e) => handleHeight(e)}
                        required
                      />
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        for="width"
                      >
                        Image Width <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="width"
                        type="number"
                        placeholder="1024"
                        onChange={(e) => handleWidth(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      for="dimension"
                    >
                      Dimension
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="dimension"
                      type="text"
                      placeholder="1024 * 1024"
                      onChange={(e) => handleDimension(e)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      for="description"
                    >
                      Description
                    </label>
                    <textarea rows={3}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight resize-none text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="description"
                      type="text"
                      placeholder="Product description"
                      onChange={(e) => handleDescription(e)}
                    ></textarea>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-yellow-400 rounded-full hover:bg-yellow-500 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="sm:pt-14 md:pt-20">
        <section className="overflow-hidden text-gray-700">
          <div className="font-serif text-center pt-20 pb-2 md:pt-0 md:pb-4 sm:visible md:visible lg:invisible">
            <div className="flex pl-4 justify-start">
              <button
                type="button"
                className="inline-block rounded-full bg-gray-600 text-white leading-normal uppercase shadow-md hover:bg-yellow-300 hover:shadow-lg focus:bg-yellow-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9 p-2"
                onClick={() => goBack()}
              >
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 122.88 108.06"
                >
                  <title>Back</title>
                  <path d="M63.94,24.28a14.28,14.28,0,0,0-20.36-20L4.1,44.42a14.27,14.27,0,0,0,0,20l38.69,39.35a14.27,14.27,0,0,0,20.35-20L48.06,68.41l60.66-.29a14.27,14.27,0,1,0-.23-28.54l-59.85.28,15.3-15.58Z" />
                </svg>
              </button>
            </div>
            <div className="justify-center">
              <h1 className="text-2xl underline text-black font-bold">
                Product Details
              </h1>
            </div>
          </div>
          <div className="lg:flex">
            <div className="row pb-2 lg:w-1/2 px-4 sm:px-5">
              <div className="flex flex-wrap -m-1 md:-m-2">
                <div className="flex flex-wrap w-full justify-center">
                  <div className="w-full pb-1 md:pb-2">
                    <img
                      style={styles.fadeIn}
                      className={
                        tempItem2 != "" && tempItem3 != "" && tempItem4 != ""
                          ? "block object-contain object-center w-full h-60 md:h-96 rounded-lg"
                          : "block object-contain object-center w-full h-60 md:h-3/4 rounded-lg"
                      }
                      src={tempItem1}
                      alt={productName}
                      onClick={() => setImage(tempItem1)}
                    />
                  </div>
                  {tempItem2 != "" && tempItem3 != "" && tempItem4 != "" ? (
                    <div className="grid grid-cols-2 lg:flex gap-4 justify-center lg:px-5">
                      <div
                        className="w-full lg:w-1/4 h-32 md:h-40 rounded-lg"
                        style={{
                          backgroundImage: `linear-gradient(rgba(160,160,160, 0.7), rgba(160,160,160, 0.7)), url(${initImage})`,
                          ...styles.fadeIn,
                        }}
                      >
                        <img
                          style={styles.fadeIn}
                          className="block object-contain cursor-pointer object-center w-full h-full shadow-lg"
                          src={initImage}
                          alt={productName}
                          onClick={() => setImage(initImage)}
                        />
                      </div>
                      <div
                        className="w-full lg:w-1/4 h-32 md:h-40 rounded-lg"
                        style={{
                          backgroundImage: `linear-gradient(rgba(160,160,160, 0.7), rgba(160,160,160, 0.7)), url(${tempItem2})`,
                          ...styles.fadeIn,
                        }}
                      >
                        <img
                          style={styles.fadeIn}
                          className="block object-contain cursor-pointer object-center w-full h-full shadow-lg"
                          src={tempItem2}
                          alt={productName}
                          onClick={() => setImage(tempItem2)}
                        />
                      </div>
                      <div
                        className="w-full lg:w-1/4 h-32 md:h-40 rounded-lg"
                        style={{
                          backgroundImage: `linear-gradient(rgba(160,160,160, 0.7), rgba(160,160,160, 0.7)), url(${tempItem3})`,
                          ...styles.fadeIn,
                        }}
                      >
                        <img
                          style={styles.fadeIn}
                          className="block object-contain cursor-pointer object-center w-full h-full shadow-lg"
                          src={tempItem3}
                          alt={productName}
                          onClick={() => setImage(tempItem3)}
                        />
                      </div>
                      <div
                        className="w-full lg:w-1/4 h-32 md:h-40 rounded-lg"
                        style={{
                          backgroundImage: `linear-gradient(rgba(160,160,160, 0.7), rgba(160,160,160, 0.7)), url(${tempItem4})`,
                          ...styles.fadeIn,
                        }}
                      >
                        <img
                          style={styles.fadeIn}
                          className="block object-contain cursor-pointer object-center w-full h-full shadow-lg"
                          src={tempItem4}
                          alt={productName}
                          onClick={() => setImage(tempItem4)}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="row py-2 lg:w-1/2 px-2 sm:px-5">
              <div className="font-serif text-center place-self-center flex justify-between">
                <h1 className="text-xl text-black font-bold">
                  Product Specification
                </h1>
                <button
                  type="button"
                  className="inline-block px-6 py-2.5 bg-yellow-400 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => handleOpen()}
                >
                  Inquire Now
                </button>
              </div>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <tbody>
                          <tr className="bg-white border-0">
                            <td className="px-6 whitespace-nowrap" colSpan={2}>
                              <div className="font-serif place-self-center">
                                <h1 className="text-sm text-gray-400 font-bold">
                                  {product[0]?.category.name}
                                </h1>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-0">
                            <td className="px-6 whitespace-nowrap" colSpan={2}>
                              <div className="font-serif place-self-center">
                                <h1 className="text-2xl text-gray-900 font-bold">
                                  {productName}
                                </h1>
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-white border-0">
                            <td className="px-6 whitespace-nowrap" colSpan={2}>
                              <div className="font-serif place-self-center">
                                <h1 className="text-md text-gray-400 font-bold">
                                  {product[0]?.sub_category.name}
                                </h1>
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-white border-0">
                            <td className="px-6" colSpan={2}>
                              <div className="font-serif place-self-center py-2">
                                <h1 className="text-md text-gray-400 font-bold">
                                  {product[0]?.description}
                                </h1>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b bg-gray-300">
                            <td
                              className="text-xl font-bold text-gray-900 px-6 py-4 whitespace-nowrap rounded-t-lg"
                              colSpan={2}
                            >
                              Post Specification
                            </td>
                          </tr>
                          <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Available
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                              {product[0]?.details.available}
                            </td>
                          </tr>
                          <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Composition
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                              {product[0]?.details.composition}
                            </td>
                          </tr>
                          <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Width
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                              {product[0]?.details.width}
                            </td>
                          </tr>
                          <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Height
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                              {product[0]?.details.height}
                            </td>
                          </tr>
                          <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Color
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                              {product[0]?.details.color}
                            </td>
                          </tr>
                          <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Design
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                              {product[0]?.details.design}
                            </td>
                          </tr>
                          <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Material
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                              {product[0]?.details.material}
                            </td>
                          </tr>
                          <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              End Use
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4">
                              {product[0]?.end_use?.map((item, index) => {
                                return (
                                  <span
                                    key={index}
                                    className="px-4 my-2 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease shadow-md"
                                  >
                                    {item}
                                  </span>
                                );
                              })}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </StyleRoot>
  );
}
