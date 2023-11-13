import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { getPostCount, POST_COUNT_GET_SUCCESS } from 'src/actions/postActions';

function AllScreen() {
    const [isLoading, setLoading] = useState(false)
    const [postCountData, setCountData] = useState({
        all: 0,
        video: 0,
        audio: 0,
        photo: 0,
        live: 0,
        helpme: 0
    });

    const { userid } = useParams();
    const navigate = useNavigate();

    useEffect( () => {
        const loadPostCount = async () => {
            try {
                setLoading( true )
                let res = await getPostCount(userid)
                setLoading( false )
                if( res.type == POST_COUNT_GET_SUCCESS ) {
                    setCountData(res.payload.data)
                }
            } catch (error) {
                setLoading( false )
            }
        }
        loadPostCount()
    }, []);

    useEffect(() => {
        if( userid && userid.length == 24 );
        else navigate('/');
    }, [userid])
    
    return (
        <div className="all-container" style={{ position: 'relative' }}>
            <Header type="home" />
            <div className='home main relative flex justify-around md:justify-start'>
                <Sidebar active="home" />
                <div className='w-full py-4 px-2 flex flex-wrap'>
                    <SubHeader active='all' userid={ userid } />
                    <div className='w-full sm:w-[50%] md:w-[33%] lg:w-[25%] aspect-[10/9] p-3'>
                        <div className='flex flex-col justify-end relative w-full h-full rounded-xl overflow-hidden'>
                            <div className='flex items-center justify-around w-full h-full absolute left-0 top-0 bg-[#9D8F8F]'>
                                <img className='w-full h-full' src={postImage} alt='post image' />
                            </div>
                            <div className='p-3 z-[1]'>
                                <h4 className='font-bold text-white text-md md:text-xl'>
                                    {"All Post"}
                                </h4>
                                <p className='font-md text-white text-sm'>{postCountData.all}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:w-[50%] md:w-[33%] lg:w-[25%] aspect-[10/9] p-3'>
                        <div className='flex flex-col justify-end relative w-full h-full rounded-xl overflow-hidden'>
                            <div className='flex items-center justify-around w-full h-full absolute left-0 top-0 bg-[#9D8F8F]'>
                                <img className='w-full h-full' src={videoImage} alt='post image' />
                            </div>
                            <div className='p-3 z-[1]'>
                                <h4 className='font-bold text-white text-md md:text-xl'>
                                    {"All Videos"}
                                </h4>
                                <p className='font-md text-white text-sm'>{postCountData.video}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:w-[50%] md:w-[33%] lg:w-[25%] aspect-[10/9] p-3'>
                        <div className='flex flex-col justify-end relative w-full h-full rounded-xl overflow-hidden'>
                            <div className='flex items-center justify-around w-full h-full absolute left-0 top-0 bg-[#9D8F8F]'>
                                <img className='w-full h-full' src={liveStreamImage} alt='post image' />
                            </div>
                            <div className='p-3 z-[1]'>
                                <h4 className='font-bold text-white text-md md:text-xl'>
                                    {"All Live Stream"}
                                </h4>
                                <p className='font-md text-white text-sm'>{postCountData.live}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:w-[50%] md:w-[33%] lg:w-[25%] aspect-[10/9] p-3'>
                        <div className='flex flex-col justify-end relative w-full h-full rounded-xl overflow-hidden'>
                            <div className='flex items-center justify-around w-full h-full absolute left-0 top-0 bg-[#9D8F8F]'>
                                <img className='w-full h-full' src={pictureImage} alt='post image' />
                            </div>
                            <div className='p-3 z-[1]'>
                                <h4 className='font-bold text-white text-md md:text-xl'>
                                    {"All Pictures"}
                                </h4>
                                <p className='font-md text-white text-sm'>{postCountData.photo}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:w-[50%] md:w-[33%] lg:w-[25%] aspect-[10/9] p-3'>
                        <div className='flex flex-col justify-end relative w-full h-full rounded-xl overflow-hidden'>
                            <div className='flex items-center justify-around w-full h-full absolute left-0 top-0 bg-[#9D8F8F]'>
                                <img className='w-[100px]' src={audioImage} alt='post image' />
                            </div>
                            <div className='p-3 z-[1]'>
                                <h4 className='font-bold text-white text-md md:text-xl'>
                                    {"All Audios"}
                                </h4>
                                <p className='font-md text-white text-sm'>{postCountData.audio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <div className={'loading-spin '+(isLoading?'active':'')}></div>
        </div>
    );
}

export default AllScreen;
