import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Header, Footer, Sidebar
} from 'src/components';

import backImage from "src/assets/images/icon/back.png"
import postImage from "src/assets/images/post.png"
import filterImage from "src/assets/images/icon/filter.png"
import maskImage from "src/assets/images/icon/mask.png"
import likeImage from "src/assets/images/icon/like.png"
import commentImage from "src/assets/images/icon/comment.png"
import viewersImage from "src/assets/images/icon/viewers.png"
import shareImage from "src/assets/images/icon/share.png"

function DetailScreen() {

    return (
        <div className="all-container" style={{ position: 'relative' }}>
            <Header type="home" />
            <div className='home main relative flex justify-around md:justify-start'>
                <Sidebar active="home" />
                <div className='w-full py-4 px-2 flex flex-wrap justify-around'>
                    <div className='w-full max-w-[700px] flex justify-between pb-3'>
                        <img className='h-[24px] mr-2' src={backImage} alt='back' />
                        <div className='flex items-center'>
                            <img className='h-[24px] mr-2' src={maskImage} alt="menu" />
                            <img className='h-[24px]' src={filterImage} alt="filter" />
                        </div>
                    </div>
                    <div className='w-full max-w-[700px] p-4 pt-0 shadow'>
                        <div className='flex flex-col justify-end w-full h-full rounded-xl overflow-hidden'>
                            <div className='p-3'>
                                <h4 className='font-bold text-xl'>
                                    {"What is Lorem Ipsum?"}
                                </h4>
                                <p className='font-md text-sm py-2'>{"5 hours Ago"}</p>
                            </div>
                            <div className='flex aspect-[10/9] w-full h-full '>
                                <img className='w-full h-full' src={postImage} alt='post image' />
                            </div>
                            <div className='p-3'>
                                <div>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </div>
                                <div className='flex pt-4'>
                                    <div className='flex flex-col items-center mr-6'>
                                        <img className='h-[32px]' src={likeImage} alt={'like'} />
                                        <span className='text-md mt-1 text-center'>5</span>
                                    </div>
                                    <div className='flex flex-col items-center mr-6'>
                                        <img className='h-[32px]' src={commentImage} alt={'like'} />
                                        <span className='text-md mt-1 text-center'>5</span>
                                    </div>
                                    <div className='flex flex-col items-center mr-6'>
                                        <img className='h-[32px]' src={viewersImage} alt={'like'} />
                                        <span className='text-md mt-1 text-center'>5</span>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <img className='h-[32px]' src={shareImage} alt={'like'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DetailScreen;