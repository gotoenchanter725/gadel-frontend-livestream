import React, { useEffect, useState } from 'react';
import {
    Header, Footer, Sidebar
} from 'src/components';
import { POSTS } from 'src/mock/mockData';
import { SubHeader } from 'src/components/SubHeader';
import { getAllPosts, POST_GET_SUCCESS } from 'src/actions/postActions';
import { settings } from 'src/services/Settings';
import { useStateValue } from '../../../services/state/State';
import { useParams } from 'react-router';
import { Like, Comment } from 'src/components/PostTool'; 

function PicturesScreen() {
    const [posts, setPosts] = useState(POSTS);
    const [isLoading, setLoading] = useState(false)
    const [state, dispatch] = useStateValue()
    const { userid } = useParams();

    useEffect(() => {
        const loadAllPosts = async () => {
            setLoading( true )
            let response = await getAllPosts(userid, null, null, 'PHOTO')
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
                <SubHeader active='picture' userid={userid} />
                <div className='w-full py-4 md:px-2 flex flex-wrap px-3'>
                    {
                        posts.map((item, index) => {
                            return item.file_path?(
                                <div key={index} className='w-full sm:w-[50%] md:w-[33%] lg:w-[25%] xl:w-[20%] aspect-[10/9] p-2 md:p-3'>
                                    <div className='flex flex-col justify-end relative w-full h-full rounded-md overflow-hidden'>
                                        <img className='absolute left-0 top-0 w-full h-full' src={`${settings.baseUrl}/${item.file_path}`} alt='post image' />
                                        <div className='py-2 bg-[#ff6262b2] z-[1] '>
                                            <h4 className='font-bold text-white text-md px-2'>
                                                {item.title}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            ):''
                        })
                    }
                </div>
            </div>
            <Footer />
            <div className={'loading-spin '+(isLoading?'active':'')}></div>
        </div>
    );
}

export default PicturesScreen;
