import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Header, Footer, Sidebar
} from 'src/components';
import { SubHeader } from 'src/components/SubHeader';

import audioImage from "src/assets/images/icon/audio.png"
import postImage from "src/assets/images/post.png"
import liveStreamImage from "src/assets/images/live-stream.png"
import videoImage from "src/assets/images/video.png"
import pictureImage from "src/assets/images/picture.png"
import "./all.scss"

function AllScreen() {

    return (
        <div className="all-container" style={{ position: 'relative' }}>
            <Header type="home" />
            <div className='home main relative flex justify-around md:justify-start'>
                <Sidebar active="home" />
                <div className='w-full py-4 px-2 flex flex-wrap'>
                    <SubHeader active='all' />
                    <div className='w-full sm:w-[50%] md:w-[33%] lg:w-[25%] aspect-[10/9] p-3'>
                        <div className='flex flex-col justify-end relative w-full h-full rounded-xl overflow-hidden'>
                            <div className='-z-[10] flex items-center justify-around w-full h-full absolute left-0 top-0 bg-[#9D8F8F]'>
                                <img className='w-full h-full' src={postImage} alt='post image' />
                            </div>
                            <div className='p-3'>
                                <h4 className='font-bold text-white text-md md:text-xl'>
                                    {"All Post"}
                                </h4>
                                <p className='font-md text-white text-sm'>{"25"}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:w-[50%] md:w-[33%] lg:w-[25%] aspect-[10/9] p-3'>
                        <div className='flex flex-col justify-end relative w-full h-full rounded-xl overflow-hidden'>
                            <div className='-z-[10] flex items-center justify-around w-full h-full absolute left-0 top-0 bg-[#9D8F8F]'>
                                <img className='w-full h-full' src={videoImage} alt='post image' />
                            </div>
                            <div className='p-3'>
                                <h4 className='font-bold text-white text-md md:text-xl'>
                                    {"All Videos"}
                                </h4>
                                <p className='font-md text-white text-sm'>{"25"}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:w-[50%] md:w-[33%] lg:w-[25%] aspect-[10/9] p-3'>
                        <div className='flex flex-col justify-end relative w-full h-full rounded-xl overflow-hidden'>
                            <div className='-z-[10] flex items-center justify-around w-full h-full absolute left-0 top-0 bg-[#9D8F8F]'>
                                <img className='w-full h-full' src={liveStreamImage} alt='post image' />
                            </div>
                            <div className='p-3'>
                                <h4 className='font-bold text-white text-md md:text-xl'>
                                    {"All Live Stream"}
                                </h4>
                                <p className='font-md text-white text-sm'>{"25"}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:w-[50%] md:w-[33%] lg:w-[25%] aspect-[10/9] p-3'>
                        <div className='flex flex-col justify-end relative w-full h-full rounded-xl overflow-hidden'>
                            <div className='-z-[10] flex items-center justify-around w-full h-full absolute left-0 top-0 bg-[#9D8F8F]'>
                                <img className='w-full h-full' src={pictureImage} alt='post image' />
                            </div>
                            <div className='p-3'>
                                <h4 className='font-bold text-white text-md md:text-xl'>
                                    {"All Pictures"}
                                </h4>
                                <p className='font-md text-white text-sm'>{"25"}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:w-[50%] md:w-[33%] lg:w-[25%] aspect-[10/9] p-3'>
                        <div className='flex flex-col justify-end relative w-full h-full rounded-xl overflow-hidden'>
                            <div className='-z-[10] flex items-center justify-around w-full h-full absolute left-0 top-0 bg-[#9D8F8F]'>
                                <img className='w-[100px]' src={audioImage} alt='post image' />
                            </div>
                            <div className='p-3'>
                                <h4 className='font-bold text-white text-md md:text-xl'>
                                    {"All Audios"}
                                </h4>
                                <p className='font-md text-white text-sm'>{"25"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AllScreen;
