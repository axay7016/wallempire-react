import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AboutUs() {
    window.scrollTo(0, 0);
    return (
        <div>
            <Header />
            <div className="h-full w-full bg-right-bottom">
                {/* About section */}
                <div className="container pt-24 px-6 mx-auto">
                    <section className="mb-10 text-gray-800">
                        <div className="block rounded-lg bg-white">
                            <div className="flex flex-wrap items-center">
                                <div className="hidden lg:flex grow-0 shrink-0 basis-auto lg:w-6/12 xl:w-4/12">
                                    <img src="https://wall-empire.s3.ap-south-1.amazonaws.com/Products/Curtains/Urban-Collection/WE-UC-0014/241be736771ccf49a7faf172005a42f8" className="w-full rounded-t-lg lg:rounded-lg" />
                                </div>
                                <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
                                    <div className="px-6 py-12 md:px-12">
                                        <h2 className="text-2xl font-bold mb-4 capitalize">About Wall-Empire</h2>

                                        <p className="text-gray-500 mb-6 text-base">
                                            Established in 2011. Became India’s first company to introduce 20 options in a digital fabric range with OEKO-Tex Certification. Biggest company for digital printing on fabrics of Home Textile, with the capacity of 3, 00,000-meter per month. We are driven by passion and ingeniousness to deliver unique and curated Home Textile Products that reflect our design aesthetic and style.
                                        </p>
                                        <p className="text-gray-500 mb-6 text-base">
                                            Wide product range segments Wallpaper, Roller Blinds, Zebra Blinds, Stitchless Roman Blinds, Cushions, and Wall Frames. Residential and commercial design are strengths. Wall Empire has been part of the three international trade shows. Structure, style, material, automation software, and various fundamental, as well as trending techniques of best Architecture and Interior designing, come into the project so that you get more than what you have imagined.
                                        </p>
                                        <p className="text-gray-500 text-base">
                                            State-of-the-art world-class infrastructure and contemporary architecture 40,000 sq. ft. Well-ordered production amenities and well-experienced personnel, achieve a monthly production capacity of 1, 20,000 sq. ft.  Wallpaper, Roller, and Zebra blinds. 3, 00,000 m. digital printing on fabrics of Home Textile.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Mission */}
                <div className="container px-6 mx-auto">
                    <section className="text-gray-800 text-center">

                        <h2 className="text-3xl font-bold mb-12 pb-4 text-center capitalize"></h2>

                        <div className="grid lg:grid-cols-2 gap-6 xl:gap-x-12">
                            <div className="mb-6 md:mb-0">
                                <div className="relative block bg-white rounded-lg">
                                    <img src="https://wall-empire.s3.ap-south-1.amazonaws.com/Products/Wall-Art/Wall-Art/WE-FR-0029/0a0097cd0fbfce4330958dd9c8ce1a48" className="relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg" />
                                    <div className="p-6 px-0 sm:px-20">
                                        <h5 className="font-bold text-lg mb-3 uppercase">Our mission</h5>
                                        <p className="mb-4 pb-2 text-base">
                                            We here at Wall Empire are dedicated to creating interiors that reflect our client's personalities and lifestyles, by capturing their design dreams and making them a reality.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 md:mb-0">
                                <div className="relative block bg-white rounded-lg">
                                    <img src="https://wall-empire.s3.ap-south-1.amazonaws.com/Products/Wall-Art/Wall-Art/WE-FR-0030/89dc457c7d9b57c01ebc5815dec80b9f" className="relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg" />
                                    <div className="p-6 px-0 sm:px-20">
                                        <h5 className="font-bold text-lg mb-3 uppercase">Our vision</h5>
                                        <p className="mb-4 pb-2 text-base">
                                            We aim to create “timeless designs” and be a globally recognized, professional product customizing company, providing solutions in the field of high-end home furnishing.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Design studio */}
                <div className="container my-24 px-6 mx-auto">
                    <section className="mb-32 text-gray-800 text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-6 text-center">Our design studio</h2>
                        <div className="pb-6 md:mb-0">
                            <div className="mb-3 text-red-600 font-medium text-sm flex items-center justify-center md:justify-start">
                            </div>
                            <p className="text-gray-500 text-base">
                                In our design studio, the design magic starts with our dynamic ideas. We see our studio as a greenhouse where a 40+ designer team generates imaginative design by taking inspiration from nature, and the culture /world around us to create truly unique creations of wall murals, blinds, and home textiles. In that way, we provide absolute gratification to our clients.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-x-6 xl:gap-x-12 items-center mb-12">
                            <div className="mb-6 md:mb-0">
                                <div className="relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                    <img src="https://wall-empire.s3.ap-south-1.amazonaws.com/Products/3rd%20Orbit/WE-OB-0032/5f9c0a7d60844fc971aed32b10580adb" className="w-full" alt="Image" />
                                </div>
                            </div>
                            <div className="mb-6 md:mb-0">
                                <h3 className="text-2xl font-bold mb-3">Wallpaper</h3>
                                <div className="mb-3 text-red-600 font-medium text-sm flex items-center justify-center md:justify-start">
                                </div>
                                <p className="text-gray-500 text-base">
                                    Customized wallpapers that can be used in residential, and commercial spaces, that most suitable for interiors. Aimed at prosperous growth in this domain, offering the highest level of customization with an excellent quality range of wallpaper.
                                </p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-x-6 xl:gap-x-12 items-center mb-12">
                            <div className="mb-6 md:mb-0 md:order-2">
                                <div className="relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg"
                                    data-mdb-ripple="true" data-mdb-ripple-color="light">
                                    <img src="https://wall-empire.s3.ap-south-1.amazonaws.com/Products/Blinds/Zebra/WE-ZE-0030/5417119e3b21910d241d88ff121150d8"
                                        className="w-full" alt="Image" />
                                    <a href="#!">
                                        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"></div>
                                    </a>
                                </div>
                            </div>

                            <div className="mb-6 md:mb-0 md:order-1">
                                <h3 className="text-2xl font-bold mb-3">Blinds</h3>
                                <div className="mb-3 text-blue-600 font-medium text-sm flex items-center justify-center md:justify-start">
                                </div>
                                <p className="text-gray-500 text-base">
                                    Available in various specifications in customization to meet the diverse needs of the clients. Offered products are designed using excellent quality raw material and the latest machinery. Motorized all blinds with motors and cordless remote.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Mission */}
            <div className="container px-6 mx-auto">
                    <section className="text-gray-800 text-center">

                        <h2 className="text-3xl font-bold mb-12 pb-4 text-center capitalize"></h2>

                        <div className="grid lg:grid-cols-2 gap-6 xl:gap-x-12">
                            <div className="mb-6 md:mb-0">
                                <div className="relative block bg-white rounded-lg">
                                    <img src="https://wall-empire.s3.ap-south-1.amazonaws.com/Products/Wall-Art/Wall-Art/WE-FR-0023/8c190aa885839608935fc7c964dccfe9" className="relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg" />
                                    <div className="p-6 px-0 sm:px-20">
                                        <h5 className="font-bold text-lg mb-3 uppercase">Wall Art</h5>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 md:mb-0">
                                <div className="relative block bg-white rounded-lg">
                                    <img src="https://wall-empire.s3.ap-south-1.amazonaws.com/Products/Cushions/Cushions/WE-CD-0002/122c7d5f53ce2304c8d7ce35550d4c95" className="relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg" />
                                    <div className="p-6 px-0 sm:px-20">
                                        <h5 className="font-bold text-lg mb-3 uppercase">Cushions</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            <Footer />
        </div >
    )
}