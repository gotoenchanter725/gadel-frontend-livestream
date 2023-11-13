import React, { useEffect, useState } from 'react';
import {
    Header, Footer, Sidebar
} from 'src/components';
import { POSTS } from 'src/mock/mockData';
import audioImage from "src/assets/images/icon/audio.png"
import { SubHeader } from 'src/components/SubHeader';
import { getAllPosts, POST_GET_SUCCESS } from 'src/actions/postActions';
import { useStateValue } from '../../../services/state/State';
import { useParams } from 'react-router';
import { Like, Comment } from 'src/components/PostTool'; 
import { settings } from '../../../services/Settings';

function AudiosScreen() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const [state, dispatch] = useStateValue()
    const { userid } = useParams();
    useEffect(() => {
        const loadAllPosts = async () => {
            setLoading( true )
            await getAllPosts(userid, null, null, 'AUDIO').then( (response) => {
                setLoading( false );
                setPosts([...response.payload.data])
            } ).catch( err => {
                setLoading( false )
            })
            
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
                <SubHeader active='audio' userid={userid} />
                <div className='w-full py-4 md:px-2 flex flex-wrap px-3'>
                    {
                        posts.map((item, index) => {
                            return (
                                <div key={index} className='w-full sm:w-[50%] md:w-[33%] xl:w-[25%] aspect-[10/9] p-3'>
                                    <div className='w-full aspect-[10/9] shadow-lg rounded-xl'>
                                        <div className='flex flex-col justify-end relative w-full h-full rounded-xl rounded-b-none overflow-hidden'>
                                            <div className='z-10 w-full pt-2 flex px-3'>
                                                <video controls className='grow h-[40px]'>
                                                    <source src={`${settings.baseUrl}/${item.file_path}`}  type="video/ogg"></source>
                                                </video>
                                            </div>
                                            <div className='grow'></div>
                                            <div className='flex items-center justify-around w-full h-full absolute left-0 top-0 bg-[#dddada]'>
                                                <img className='w-[100px]' src={audioImage} alt='post image' />
                                            </div>
                                            <div className='p-3'>
                                                <h4 className='font-bold text-white text-md'>
                                                    {item.title}
                                                </h4>
                                                <p className='font-md text-white text-sm'>{item.description}</p>
                                            </div>
                                        </div>
                                        <div className='p-3 flex bg-white rounded-xl'>
                                            <Like userid={userid} postid={item._id} likes={item.like} />
                                            <Comment userid={userid} postid={item._id} comments={item.comments} />
                                        </div>
                                    </div>
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

export default AudiosScreen;
