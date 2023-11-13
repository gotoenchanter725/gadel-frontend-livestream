import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Header, Footer, Sidebar
} from 'src/components';

import { POSTS } from 'src/mock/mockData';

import pictureImage from "../../assets/images/icon/picture.png";
import videoImage from "../../assets/images/icon/video.png";
import audioImage from "../../assets/images/icon/audio-primary.png";
import helpmeImage from "../../assets/images/icon/helpme.png";
import backImage from "../../assets/images/icon/back.png";

function SettingScreen() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState(POSTS);

    return (
        <div className='flex flex-col'>
            <Header type='home' />
            <div className="setting-container" >
                <div className='flex flex-col pt-6 px-8'>
                    <div>
                        <Link to={'/'}>
                            <img className='w-[25px]' src={backImage} alt='back' />
                        </Link>
                    </div>
                    <h2 className='text-4xl font-semibold py-3 w-full text-center'>Setting</h2>
                    <p className='text-black text-2xl frot-semibold w-full text-center pb-6'>Please select your preference to post your content now</p>
                    <div className='flex flex-wrap justify-between'>
                        <div className="w-full items-start flex sm:w-[49%] lg:w-[32.5%] mb-3 border border-solid border-black rounded px-4 py-5 h-[140px] cursor-pointer">
                            <img className='w-[60px] aspect-[1/1] mr-4' src={helpmeImage} alt='help me' />
                            <div className=''>
                                <h5 className='text-black text-xl mb-2 font-semibold'>Help me find</h5>
                                <p className='text-lg'>Find file, Permission</p>
                            </div>
                        </div>
                        <div className="w-full items-start flex sm:w-[49%] lg:w-[32.5%] mb-3 border border-solid border-black rounded px-4 py-5 h-[140px] cursor-pointer">
                            <img className='w-[60px] aspect-[1/1] mr-4' src={audioImage} alt='audio' />
                            <div className=''>
                                <h5 className='text-black text-xl mb-2 font-semibold'>Audio</h5>
                                <p className='text-lg'>Find Audio. Permission</p>
                            </div>
                        </div>
                        <div className="w-full items-start flex sm:w-[49%] lg:w-[32.5%] mb-3 border border-solid border-black rounded px-4 py-5 h-[140px] cursor-pointer">
                            <img className='w-[60px] aspect-[1/1] mr-4' src={videoImage} alt='video' />
                            <div className=''>
                                <h5 className='text-black text-xl mb-2 font-semibold'>Video</h5>
                                <p className='text-lg'>Find Video, Permission</p>
                            </div>
                        </div>
                        <div className="w-full items-start flex sm:w-[49%] lg:w-[32.5%] mb-3 border border-solid border-black rounded px-4 py-5 h-[140px] cursor-pointer">
                            <img className='w-[60px] aspect-[1/1] mr-4' src={pictureImage} alt='photo' />
                            <div className=''>
                                <h5 className='text-black text-xl mb-2 font-semibold'>Photo</h5>
                                <p className='text-lg'>Find Photo, Permission</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SettingScreen;
