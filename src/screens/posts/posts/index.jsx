import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Header, Footer, Sidebar
} from 'src/components';
import { POSTS } from 'src/mock/mockData';
import CreatePostComponent from 'src/components/CreatePost';
import PostComponent from 'src/components/PostComponent';

function PostsScreen() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState(POSTS);
    return (
        <div className="" style={{ position: 'relative' }}>
            <Header />
            <div className='home main relative flex justify-around md:justify-start'>
                <div className='w-full py-4 px-2 flex flex-wrap'>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PostsScreen;
