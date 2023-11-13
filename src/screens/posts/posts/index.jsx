import React, { useEffect, useState } from 'react';
import { useAsyncValue, useNavigate, useParams } from 'react-router-dom';
import {
    Header, Footer, Sidebar
} from 'src/components';
import { POSTS } from 'src/mock/mockData';
import { SubHeader } from 'src/components/SubHeader';
import { getAllPosts, POST_GET_SUCCESS } from 'src/actions/postActions';
import { settings } from 'src/services/Settings';
import audioImage from "src/assets/images/icon/audio.png"
import { useStateValue } from '../../../services/state/State';

function PostsScreen() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState( false )
    const [state, dispatch] = useStateValue()
    const { userid } = useParams();

    useEffect(() => {
        const loadAllPosts = async () => {
            setLoading( true )
            let response = await getAllPosts(userid, null, null, 'ALL')
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
            <div className='home main relative flex flex-col py-4 px-2 md:px-6'>
                <SubHeader active='post' userid={userid} />
                <div className='w-full py-4 md:px-2 flex flex-wrap px-3'>
                    {
                        posts.map((item, index) => {
                            return (
                                <div key={index} className='w-full sm:w-[50%] md:w-[33%] xl:w-[25%] aspect-[10/9] p-2 md:p-3'>
                                    <div className='flex flex-col justify-end relative w-full h-full rounded-xl overflow-hidden shadow-lg'>
                                        {(item.type == 'PHOTO')?(
                                            <img className='absolute left-0 top-0 w-full h-full' src={`${settings.baseUrl}/${item.file_path}`} alt='post image' />
                                        ): item.type == 'AUDIO' ? (
                                            <div className='w-full flex p-3 h-full flex-col justify-end bg-gray-300'>
                                                <div className='z-[0] flex items-center justify-around w-full h-full absolute left-0 top-0 bg-[#9D8F8F]'>
                                                    <img className='w-[100px]' src={audioImage} alt='post image' />
                                                </div>
                                                <video controls className='grow h-[40px]'>
                                                    <source src={`${settings.baseUrl}/${item.file_path}`} type="video/ogg"/>
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        ) : (
                                            <video controls className='absolute left-0 top-0 w-full h-full object-fill'>
                                                <source src={`${settings.baseUrl}/${item.file_path}`} type="video/mp4"/>
                                                <source src={`${settings.baseUrl}/${item.file_path}`} type="video/ogg"/>
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                        
                                        {(item.type == 'PHOTO')?<div className='z-[1] py-2 bg-[#ff6262b2]'>
                                            <h4 className='font-bold text-white text-md px-2'>
                                                {item.title}
                                            </h4>
                                            <p className='font-md text-white text-sm px-2'>{item.description}</p>
                                        </div>:''}
                                    </div>
                                    <div className={'loading-spin '+(isLoading?'active':'')}></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
            <div className={'loading-spin '+(isLoading?'active':'')}></div>
        </div>
    );
}

export default PostsScreen;
