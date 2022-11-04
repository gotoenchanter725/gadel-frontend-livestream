import React, { useState } from 'react';
import {
    Header, Footer, Sidebar
} from 'src/components';
import { POSTS } from 'src/mock/mockData';
import audioImage from "src/assets/images/icon/audio.png"
import { SubHeader } from 'src/components/SubHeader';

function AudiosScreen() {
    const [posts, setPosts] = useState(POSTS);
    return (
        <div className="" style={{ position: 'relative' }}>
            <Header />
            <div className='home main relative flex flex-col py-4 px-2 md:px-6'>
                <SubHeader active='audio' />
                <div className='w-full py-4 md:px-2 flex flex-wrap px-3 md:px-0'>
                    {
                        posts.map((item, index) => {
                            return (
                                <div key={index} className='w-full sm:w-[50%] md:w-[33%] xl:w-[25%] aspect-[10/9] p-3'>
                                    <div className='flex flex-col justify-end relative w-full h-full rounded-xl overflow-hidden'>
                                        <div className='-z-[10] flex items-center justify-around w-full h-full absolute left-0 top-0 bg-[#9D8F8F]'>
                                            <img className='w-[100px]' src={audioImage} alt='post image' />
                                        </div>
                                        <div className='p-3'>
                                            <h4 className='font-bold text-white text-md'>
                                                {"What is Lorem Ipsum?"}
                                            </h4>
                                            <p className='font-md text-white text-sm'>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}</p>
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

export default AudiosScreen;
