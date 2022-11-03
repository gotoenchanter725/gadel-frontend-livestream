import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Header, Footer, Sidebar
} from 'src/components';
import { POSTS } from 'src/mock/mockData';
import liveImage from "src/assets/images/icon/live.png"
import videoImage from "src/assets/images/video.png"
import likeImage from "src/assets/images/icon/like.png"
import commentImage from "src/assets/images/icon/comment.png"
import viewersImage from "src/assets/images/icon/viewers.png"
import shareImage from "src/assets/images/icon/share.png"
import showMoreImage from "src/assets/images/icon/show-more.png"
import bgLivestream from "src/assets/images/bg-livestream.png"
import user from 'src/assets/images/image.png';
import { SubHeader } from 'src/components/SubHeader';

function VideosScreen() {
    const [posts, setPosts] = useState(POSTS);
    return (
        <div className="" style={{ position: 'relative' }}>
            <Header />
            <div className='home main relative flex flex-col py-4 px-2 md:px-6'>
                <SubHeader active='video' />
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className='w-full md:w-[75%]'>
                        <div className="rounded-xl shadow-button py-6">
                            <div className='px-6 pb-3'>
                                <div className="flex justify-between items-center pb-2">
                                    <div className="flex items-center">
                                        <div className="flex w-[50px] h-[50px] aspect-[1/1] rounded-full overflow-hidden border-2 border-solid border-secondary">
                                            <img src={user} alt='user' />
                                        </div>
                                        <div className='ml-2'>
                                            <h1 className="text-lg text-secondary-font ">Rihanna Crace</h1>
                                            <p className="text-secondary-font text-sm">New York, US</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <img className="h-[24px] overflow-hidden rounded-2xl" src={liveImage} alt='live' />
                                    </div>
                                </div>
                                <div className='flex flex-col'>

                                    <img src={videoImage} alt="video image" />
                                    <div className='flex justify-between items-center mt-4'>
                                        <div className='flex flex-col'>
                                            <h1 className="text-md font-semibold text-[#383333] ">What is Lorem Ipsum?</h1>
                                            <p className="text-[#727272] text-xs">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between mt-4'>
                                        <div className='flex'>
                                            <div className='flex flex-col items-center mr-5'>
                                                <div className='flex items-center'>
                                                    <img className='w-[24px] mr-1.5' src={likeImage} alt='like' />
                                                    <span className='font-semibold text-md text-black'>86</span>
                                                </div>
                                                <span className='font-semibold text-md text-[#383333]'>Like</span>
                                            </div>
                                            <div className='flex flex-col items-center mr-5'>
                                                <div className='flex items-center'>
                                                    <img className='w-[24px] mr-1.5' src={commentImage} alt='comment' />
                                                    <span className='font-semibold text-md text-black'>86</span>
                                                </div>
                                                <span className='font-semibold text-md text-[#383333]'>Comment</span>
                                            </div>
                                            <div className='flex flex-col items-center mr-5'>
                                                <div className='flex items-center'>
                                                    <img className='w-[24px] mr-1.5' src={viewersImage} alt='viewers' />
                                                    <span className='font-semibold text-md text-black'>23</span>
                                                </div>
                                                <span className='font-semibold text-md text-[#383333]'>Viewers</span>
                                            </div>
                                            <div className='flex flex-col items-center mr-5'>
                                                <div className='flex items-center'>
                                                    <img className='w-[24px] mr-1.5' src={shareImage} alt='share' />
                                                </div>
                                                <span className='font-semibold text-md text-[#383333]'>Share</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-4 flex items-center'>
                                        <button className='font-semibold text-sm text-[#383333]'>SHOW MORE</button>
                                        <img className='ml-2 w-[14px]' src={showMoreImage} alt="show more" />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col px-6'>
                                <div className="flex flex-col pb-4">
                                    <p className='text-xs text-[#727272]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    <p className='text-xs text-[#727272]'>More video link -<Link className='text-[#2092D1]' to={'/'}>https://www.youtube.com/watch?v=Lorem Ipsum</Link></p>
                                    <p className='text-xs text-[#727272]'>Hi</p>
                                    <p className='text-xs text-[#727272]'>I am Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                    <p className='text-xs text-[#727272]'>Our some other playlist -</p>
                                    <p className='text-xs text-[#727272]'>About youtube guidelines</p>
                                    <p className='text-xs text-[#727272]'><Link className='text-[#2092D1]' to={'/'}>https://www.youtube.com/watch?v=Lorem Ipsum</Link></p>
                                    <p className='text-xs text-[#727272]'>Abcd Video</p>
                                    <p className='text-xs text-[#727272]'><Link className='text-[#2092D1]' to={'/'}>https://www.youtube.com/watch?v=Lorem Ipsum</Link></p>
                                </div>
                                <div className=''>
                                    <h5 className='font-semibold text-sm text-[#383333]'>Commet here</h5>
                                    <div>
                                        <div className='flex items-start mb-2'>
                                            <div className='bg-[#D108BD] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>A</div>
                                            <div className='text-[#505050]'>
                                                <span className='font-semibold text-xs'>Stark Black</span>
                                                <p className='text-xs'>Say something..  (slow mode is on)</p>
                                            </div>
                                        </div>
                                        <div className='flex items-start mb-2'>
                                            <div className='bg-[#D108BD] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>B</div>
                                            <div className='text-[#505050]'>
                                                <span className='font-semibold text-xs'>Stark Black</span>
                                                <p className='text-xs'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full mt-6'>
                            <p className='text-center text-xl text-primary font-semibold mb-4'>Old Posts</p>
                            <div className='w-full flex flex-wrap justify-between'>
                                {
                                    posts.map((item, index) => {
                                        return (
                                            <div key={index} className='w-full md:w-[calc(50%-10px)] p-3 mb-6 rounded-xl shadow-button'>
                                                <div className='pb-1'>
                                                    <div className="flex justify-between items-center pb-2">
                                                        <div className="flex items-center">
                                                            <div className="flex w-[35px] h-[35px] aspect-[1/1] rounded-full overflow-hidden border-2 border-solid border-secondary">
                                                                <img src={user} alt='user' />
                                                            </div>
                                                            <div className='ml-2'>
                                                                <h1 className="text-md text-secondary-font ">Rihanna Crace</h1>
                                                                <p className="text-secondary-font text-xs">New York, US</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <img className="h-[18px] mr-2 overflow-hidden rounded-2xl" src={liveImage} alt='live' />
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <img className='' src={videoImage} alt="video image" />
                                                        <div className='flex justify-between items-center mt-4'>
                                                            <div className='flex flex-col'>
                                                                <h1 className="text-md font-semibold text-[#383333] ">What is Lorem Ipsum?</h1>
                                                                <p className="text-[#727272] text-xs">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                            </div>
                                                        </div>
                                                        <div className='flex justify-between mt-4'>
                                                            <div className='flex'>
                                                                <div className='flex flex-col items-center mr-5'>
                                                                    <div className='flex items-center'>
                                                                        <img className='w-[24px] mr-1.5' src={likeImage} alt='like' />
                                                                        <span className='font-semibold text-md text-black'>86</span>
                                                                    </div>
                                                                </div>
                                                                <div className='flex flex-col items-center mr-5'>
                                                                    <div className='flex items-center'>
                                                                        <img className='w-[20px] mr-1.5' src={commentImage} alt='comment' />
                                                                        <span className='font-semibold text-md text-black'>86</span>
                                                                    </div>
                                                                </div>
                                                                <div className='flex flex-col items-center mr-5'>
                                                                    <div className='flex items-center'>
                                                                        <img className='w-[20px] mr-1.5' src={viewersImage} alt='viewers' />
                                                                        <span className='font-semibold text-md text-black'>23</span>
                                                                    </div>
                                                                </div>
                                                                <div className='flex flex-col items-center mr-5'>
                                                                    <div className='flex items-center'>
                                                                        <img className='w-[20px] mr-1.5' src={shareImage} alt='share' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col min-w-[200px] w-full md:w-[25%] ml-4'>
                        <div className='flex flex-col'>
                            <div className='flex justify-between mb-4'>
                                <img className='aspect-[4/3] w-1/2' src={videoImage} />
                                <div className='flex flex-col justify-between ml-2'>
                                    <h6 className='text-sm font-semibold text-[#444040]'>Lorem Ipsum is simply dummy</h6>
                                    <div className='flex flex-col'>
                                        <span className='text-[#A08E8E] text-xs'>ABCD</span>
                                        <span className='text-[#A08E8E] text-xs'>2.5K view  2 month ago</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between mb-4'>
                                <img className='aspect-[4/3] w-1/2' src={videoImage} />
                                <div className='flex flex-col justify-between ml-2'>
                                    <h6 className='text-sm font-semibold text-[#444040]'>Lorem Ipsum is simply dummy</h6>
                                    <div className='flex flex-col'>
                                        <span className='text-[#A08E8E] text-xs'>ABCD</span>
                                        <span className='text-[#A08E8E] text-xs'>2.5K view  2 month ago</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between mb-4'>
                                <img className='aspect-[4/3] w-1/2' src={videoImage} />
                                <div className='flex flex-col justify-between ml-2'>
                                    <h6 className='text-sm font-semibold text-[#444040]'>Lorem Ipsum is simply dummy</h6>
                                    <div className='flex flex-col'>
                                        <span className='text-[#A08E8E] text-xs'>ABCD</span>
                                        <span className='text-[#A08E8E] text-xs'>2.5K view  2 month ago</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between mb-4'>
                                <img className='aspect-[4/3] w-1/2' src={videoImage} />
                                <div className='flex flex-col justify-between ml-2'>
                                    <h6 className='text-sm font-semibold text-[#444040]'>Lorem Ipsum is simply dummy</h6>
                                    <div className='flex flex-col'>
                                        <span className='text-[#A08E8E] text-xs'>ABCD</span>
                                        <span className='text-[#A08E8E] text-xs'>2.5K view  2 month ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img className='w-full' src={bgLivestream} alt='bgLivestream' />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default VideosScreen;
