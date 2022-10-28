import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Header, Footer, Sidebar
} from 'src/components';
import { POSTS } from 'src/mock/mockData';
import filterImage from "src/assets/images/icon/filter.png"
import maskImage from "src/assets/images/icon/mask.png"

function PicturesScreen() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState(POSTS);
    return (
        <div className="" style={{ position: 'relative' }}>
            <Header />
            <div className='home main relative flex flex-col py-4 px-2 md:px-6'>
                <div className='flex flex-col md:flex-row  items-end md:items-center w-full sm:px-2 md:px-4'>
                    <div className='w-full flex justify-between md:justify-start order-2 md:order-1'>
                        <button className='font-semibold shadow-button rounded-full text-sm md:text-md px-3 sm:px-4 md:px-6 py-1 md:py-1.5 mr-1 md:mr-3 text-white bg-button' onClick={() => navigate("/posts")}>Posts</button>
                        <button className='font-semibold shadow-button rounded-full text-sm md:text-md px-3 sm:px-4 md:px-6 py-1 md:py-1.5 mr-1 md:mr-3 text-button bg-white' onClick={() => navigate("/pictures")}>Pictures</button>
                        <button className='font-semibold shadow-button rounded-full text-sm md:text-md px-3 sm:px-4 md:px-6 py-1 md:py-1.5 mr-1 md:mr-3 text-white bg-button' onClick={() => navigate("/videos")}>Videos</button>
                        <button className='font-semibold shadow-button rounded-full text-sm md:text-md px-3 sm:px-4 md:px-6 py-1 md:py-1.5 mr-1 md:mr-3 text-white bg-button' onClick={() => navigate("/audios")}>Audio</button>
                        <button className='font-semibold shadow-button rounded-full text-sm md:text-md px-3 sm:px-4 md:px-6 py-1 md:py-1.5 text-white bg-button' onClick={() => navigate("/live-streams")}>Live Streams</button>
                    </div>
                    <div className='flex order-1 md:order-2 mb-2 md:mb-0'>
                        <img className='w-[18px] md:w-[24px] cursor-pointer' src={filterImage} alt='filter' />
                        <img className='w-[18px] md:w-[24px] cursor-pointer ml-4' src={maskImage} alt='alt image' />
                    </div>
                </div>
                <div className='w-full py-4 md:px-2 flex flex-wrap'>
                    {
                        posts.map((item, index) => {
                            return (
                                <div key={index} className='w-full sm:w-[50%] md:w-[33%] lg:w-[25%] xl:w-[20%] aspect-[10/9] p-2 md:p-3'>
                                    <div className='flex flex-col justify-end relative w-full h-full rounded-md overflow-hidden'>
                                        <img className='-z-[10] absolute left-0 top-0 w-full h-full' src={item.img} alt='post image' />
                                        <div className='py-2 bg-[#ff6262b2]'>
                                            <h4 className='font-bold text-white text-md px-2'>
                                                {"What is Lorem Ipsum?"}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PicturesScreen;
