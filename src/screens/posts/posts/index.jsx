import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Header, Footer, Sidebar
} from 'src/components';
import { POSTS } from 'src/mock/mockData';
import { SubHeader } from 'src/components/SubHeader';

function PostsScreen() {
    const [posts, setPosts] = useState(POSTS);
    return (
        <div className="" style={{ position: 'relative' }}>
            <Header />
            <div className='home main relative flex flex-col py-4 px-2 md:px-6'>
                <SubHeader active='post' />
                <div className='w-full py-4 md:px-2 flex flex-wrap'>
                    {
                        posts.map((item, index) => {
                            return (
                                <div key={index} className='w-full sm:w-[50%] md:w-[33%] xl:w-[25%] aspect-[10/9] p-2 md:p-3'>
                                    <div className='flex flex-col justify-end relative w-full h-full rounded-xl overflow-hidden'>
                                        <img className='-z-[10] absolute left-0 top-0 w-full h-full' src={item.img} alt='post image' />
                                        <div className='py-2 bg-[#ff6262b2]'>
                                            <h4 className='font-bold text-white text-md px-2'>
                                                {"What is Lorem Ipsum?"}
                                            </h4>
                                            <p className='font-md text-white text-sm px-2'>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}</p>
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

export default PostsScreen;
