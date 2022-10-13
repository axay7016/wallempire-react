import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/solid';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';

class Banner extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            current: 0,
            length: 0,
            image: '',
            timing: 5000,
            interval: '',
            BannerData: []
        }
    }

    nextBanner = async () => {
        await this.setState({ current: this.state.current === this.state.length - 1 ? 0 : this.state.current + 1 });
        await this.setState({ image: this.state.BannerData[this.state.current].image })
        // clearInterval(this.state.interval);
        // setTimeout(function() {
        //     this.setState({ interval: setInterval(this.nextBanner, this.state.timing) });
        // }, this.state.timing);
    }

    prevBanner = async () => {
        await this.setState({ current: this.state.current === 0 ? this.state.length - 1 : this.state.current - 1 });
        await this.setState({ image: this.state.BannerData[this.state.current].image })
    }

    setBanner = (e, banner) => {
        this.setState({ current: banner });  
        this.setState({ image: this.state.BannerData[banner].image })
    }

    bannerhandler() {
        axios.get(process.env.REACT_APP_SERVER_API + "/banner?type=Main", {
            headers: {
                authorization: 'Basic d2FsbGVtcGlyZTp3YWxsZW1waXJl'
            }
        }).then(bannerRes => {
            if (bannerRes.status === 200) {
                this.setState({ length: bannerRes.data.data.length });
                this.setState({ BannerData: bannerRes.data.data });
                this.setState({ image: this.state.BannerData[0].image })
            }
        })
    }

    componentDidMount() {
        this.bannerhandler()
        this.setState({ interval: setInterval(this.nextBanner, this.state.timing) })
    }

    render() {
        return (
            <div className="relative select-none flex items-center z-0 justify-center h-72 sm:h-72 md:h-1/2 lg:h-screen 2xl:h-screen w-full">
                <ArrowCircleLeftIcon
                    className="h-7 md:h-10 absolute text-yellow-400 flex z-10 left-5 bg-white cursor-pointer rounded-full shadow-lg hover:shadow-none"
                    onClick={this.prevBanner} />

                <ArrowCircleRightIcon
                    className="h-7 md:h-10 absolute text-yellow-400 flex z-10 right-5 bg-white cursor-pointer rounded-full shadow-lg hover:shadow-none"
                    onClick={this.nextBanner} />

                <LazyLoadImage
                    className="flex relative h-60 sm:h-60 md:h-1/2 lg:h-screen 2xl:h-screen w-full"
                    alt="Banner images"
                    src={this.state.image} />

                <div className="absolute flex z-10 bottom-0 m-10">
                    {this.state.BannerData.map((slide, index) =>
                        this.state.current == index ?
                            (
                                <div
                                    key={index}
                                    className="bg-white p-1 md:p-2 z-10 items-center flex-grow float-left 
                                mx-2 rounded-full hover:shadow-md cursor-pointer"
                                    onClick={(e) => this.setBanner(e, index)}>
                                </div>
                            ) : (
                                <div
                                    key={index}
                                    className="bg-yellow-400 p-1 md:p-2 z-10 items-center flex-grow float-left 
                                mx-2 rounded-full hover:shadow-md cursor-pointer"
                                    onClick={(e) => this.setBanner(e, index)}>
                                </div>
                            )
                    )}
                </div>
            </div>
        )
    }

}


export default Banner

