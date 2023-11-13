import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import chatDownImage from "src/assets/images/icon/chat-down.png"
import chatMenuImage from "src/assets/images/icon/chat-menu.png"
import emojiImage from "src/assets/images/icon/emoji.png"
import starImage from "src/assets/images/icon/star.png"
import transferImage from "src/assets/images/icon/transfer.png"
import bgLivestream from "src/assets/images/bg-livestream.png"
import user from 'src/assets/images/image.png';
import { SubHeader } from 'src/components/SubHeader';
import { getAllPosts, POST_GET_SUCCESS } from 'src/actions/postActions';
import { useStateValue } from '../../../services/state/State';
import { useParams } from 'react-router';

function PostsScreen() {
    const [posts, setPosts] = useState(POSTS);
    const [isLoading, setLoading] = useState(false)
    const [state, dispatch] = useStateValue()
    const { userid } = useParams();

    useEffect(() => {
        const loadAllPosts = async () => {
            setLoading( true )
            let response = await getAllPosts(userid, null, null, 'LIVE')
            setLoading( false )
            if( response.type == POST_GET_SUCCESS ) {
                console.log(response)
                setPosts(response.payload.data)
            }
        }
        try {
            loadAllPosts()
        } catch (error) {
            setLoading(false)
        }
        
    }, [])
    return (
        <div className="" style={{ position: 'relative' }}>
            <Header />
            <div className='w-full home main relative flex py-4 px-2 md:px-6 flex-wrap'>
                <SubHeader active='live-stream' userid={userid} />

                <div className='flex flex-col md:flex-row justify-between px-3 md:px-0'>
                    <div className='w-full md:w-[70%]'>
                        <div className="rounded-xl shadow-button py-6">
                            <div className='px-6 pb-3 border-b border-solid border-black'>
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
                                        <img className="h-[24px] mr-2 overflow-hidden rounded-2xl" src={liveImage} alt='live' />
                                        <span className="font-bold text-md">Live</span>
                                    </div>
                                </div>
                                <div className='flex flex-col'>

                                    <img src={videoImage} alt="video image" />
                                    <div className='flex justify-between flex-wrap md:flex-nowrap items-center mt-4'>
                                        <div className='flex flex-col'>
                                            <h1 className="text-sm md:text-md font-semibold text-[#383333] ">What is Lorem Ipsum?</h1>
                                            <p className="text-[#727272] text-xs">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        </div>
                                        <button className='mt-2 md:mt-0 px-2.5 py-1.5 rounded text-[#727272] bg-[#EBEAEA] shadow text-xs'>Gift page is active <Link className='text-[#03649B]' to={'/'}>see page</Link></button>
                                    </div>
                                    <div className='flex justify-between flex-wrap mt-4'>
                                        <div className='flex'>
                                            <div className='flex flex-col items-center mr-5'>
                                                <div className='flex items-center'>
                                                    <img className='w-[18px] md:w-[24px] mr-1.5' src={likeImage} alt='like' />
                                                    <span className='font-semibold text-sm md:text-md text-black'>86</span>
                                                </div>
                                                <span className='font-semibold text-sm md:text-md text-[#383333]'>Like</span>
                                            </div>
                                            <div className='flex flex-col items-center mr-5'>
                                                <div className='flex items-center'>
                                                    <img className='w-[18px] md:w-[24px] mr-1.5' src={commentImage} alt='comment' />
                                                    <span className='font-semibold text-sm md:text-md text-black'>86</span>
                                                </div>
                                                <span className='font-semibold text-sm md:text-md text-[#383333]'>Comment</span>
                                            </div>
                                            <div className='flex flex-col items-center mr-5'>
                                                <div className='flex items-center'>
                                                    <img className='w-[18px] md:w-[24px] mr-1.5' src={viewersImage} alt='viewers' />
                                                    <span className='font-semibold text-sm md:text-md text-black'>23</span>
                                                </div>
                                                <span className='font-semibold text-sm md:text-md text-[#383333]'>Viewers</span>
                                            </div>
                                            <div className='flex flex-col items-center mr-5'>
                                                <div className='flex items-center'>
                                                    <img className='w-[18px] md:w-[24px] mr-1.5' src={shareImage} alt='share' />
                                                </div>
                                                <span className='font-semibold text-sm md:text-md text-[#383333]'>Share</span>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-center text-md font-bold text-xs my-2 text-[#727272]'>Other Options of live stream</p>
                                            <div className='flex justify-between'>
                                                <button className='bg-primary text-white text-sm px-4 py-1 mr-1'>OBS</button>
                                                <button className='bg-primary text-white text-sm px-4 py-1'>vMix</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col py-4 px-6">
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
                                                            <span className="font-bold text-sm">Live</span>
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
                    <div className='flex flex-col min-w-[250px] w-full md:w-[30%] md:ml-4'>
                        <div className='flex flex-col shadow-button rounded'>
                            <div className='bg-[#FB6666] px-4 py-6 flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <span className='text-white text-md'>Top chat</span>
                                    <img className='ml-2 w-[10px]' src={chatDownImage} alt={'Top chat down'} />
                                </div>
                                <img className='w-[15px]' src={chatMenuImage} />
                            </div>
                            <div className='max-h-[500px] mr-[1px] border-b border-solid border-[#CCB2B2] overflow-x-hidden overflow-y-auto p-2.5 scrollbar-w-[2px] scroll-smooth scrollbar-thin scrollbar-thumb-[#D9D9D9] scrollbar-track-transparent scrollbar-corner-transparent scrollbar-track-p-2'>
                                <div className='flex items-start mb-2'>
                                    <div className='bg-[#0A92A5] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>S</div>
                                    <div className='text-[#505050]'>
                                        <span className='font-bold text-sm'>John Paul Arocena</span>
                                        <p className='text-xs'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                    </div>
                                </div>
                                <div className='flex items-start mb-2'>
                                    <div className='bg-[#0A92A5] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>S</div>
                                    <div className='text-[#505050]'>
                                        <span className='font-bold text-sm'>John Paul Arocena</span>
                                        <p className='text-xs'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                    </div>
                                </div>
                                <div className='flex items-start mb-2'>
                                    <div className='bg-[#0A92A5] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>S</div>
                                    <div className='text-[#505050]'>
                                        <span className='font-bold text-sm'>John Paul Arocena</span>
                                        <p className='text-xs'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                    </div>
                                </div>
                                <div className='flex items-start mb-2'>
                                    <div className='bg-[#D108BD] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>S</div>
                                    <div className='text-[#505050]'>
                                        <span className='font-bold text-sm'>Stark Black</span>
                                        <p className='text-xs'>Say something..  (slow mode is on)</p>
                                    </div>
                                </div>
                                <div className='flex items-start mb-2'>
                                    <div className='bg-[#0A92A5] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>S</div>
                                    <div className='text-[#505050]'>
                                        <span className='font-bold text-sm'>John Paul Arocena</span>
                                        <p className='text-xs'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                    </div>
                                </div>
                                <div className='flex items-start mb-2'>
                                    <div className='bg-[#D108BD] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>S</div>
                                    <div className='text-[#505050]'>
                                        <span className='font-bold text-sm'>Stark Black</span>
                                        <p className='text-xs'>Say something..  (slow mode is on)</p>
                                    </div>
                                </div>
                                <div className='flex items-start mb-2'>
                                    <div className='bg-[#0A92A5] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>S</div>
                                    <div className='text-[#505050]'>
                                        <span className='font-bold text-sm'>John Paul Arocena</span>
                                        <p className='text-xs'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                    </div>
                                </div>
                                <div className='flex items-start mb-2'>
                                    <div className='bg-[#D108BD] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>S</div>
                                    <div className='text-[#505050]'>
                                        <span className='font-bold text-sm'>Stark Black</span>
                                        <p className='text-xs'>Say something..  (slow mode is on)</p>
                                    </div>
                                </div>
                                <div className='flex items-start mb-2'>
                                    <div className='bg-[#0A92A5] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>S</div>
                                    <div className='text-[#505050]'>
                                        <span className='font-bold text-sm'>John Paul Arocena</span>
                                        <p className='text-xs'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                    </div>
                                </div>
                                <div className='flex items-start mb-2'>
                                    <div className='bg-[#D108BD] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>S</div>
                                    <div className='text-[#505050]'>
                                        <span className='font-bold text-sm'>Stark Black</span>
                                        <p className='text-xs'>Say something..  (slow mode is on)</p>
                                    </div>
                                </div>
                                <div className='flex items-start mb-2'>
                                    <div className='bg-[#0A92A5] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>S</div>
                                    <div className='text-[#505050]'>
                                        <span className='font-bold text-sm'>John Paul Arocena</span>
                                        <p className='text-xs'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                    </div>
                                </div>
                                <div className='flex items-start mb-2'>
                                    <div className='bg-[#D108BD] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>S</div>
                                    <div className='text-[#505050]'>
                                        <span className='font-bold text-sm'>Stark Black</span>
                                        <p className='text-xs'>Say something..  (slow mode is on)</p>
                                    </div>
                                </div>
                                <div className='flex items-start mb-2'>
                                    <div className='bg-[#0A92A5] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>S</div>
                                    <div className='text-[#505050]'>
                                        <span className='font-bold text-sm'>John Paul Arocena</span>
                                        <p className='text-xs'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                    </div>
                                </div>
                                <div className='flex items-start mb-2'>
                                    <div className='bg-[#D108BD] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>S</div>
                                    <div className='text-[#505050]'>
                                        <span className='font-bold text-sm'>Stark Black</span>
                                        <p className='text-xs'>Say something..  (slow mode is on)</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between px-4 py-4 border-b border-solid border-[#CCB2B2]'>
                                <div className='flex'>
                                    <img className='h-[25px] mr-2' src={emojiImage} alt="emoji" />
                                    <img className='h-[25px]' src={starImage} alt="star" />
                                </div>
                                <div className='flex items-center'>
                                    <span className='text-md text-[#505050]'>1/200</span>
                                    <img className='h-[25px] ml-2' src={transferImage} alt="transfer" />
                                </div>
                            </div>
                            <div className='flex items-center justify-around p-4'>
                                <button className='text-sm'>HIDE CHAT</button>
                            </div>
                        </div>
                        <img className='w-full mt-4' src={bgLivestream} alt='bgLivestream' />
                    </div>
                </div>
            </div>
            <Footer />
            <div className={'loading-spin '+(isLoading?'active':'')}></div>
        </div>
    );
}

export default PostsScreen;
