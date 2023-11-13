import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Header, Footer, Sidebar
} from 'src/components';
import { POSTS } from 'src/mock/mockData';
import CreatePostComponent from 'src/components/CreatePost';
import PostComponent from 'src/components/PostComponent';

import backImage from '../../assets/images/icon/back.png';
import settingImage from '../../assets/images/icon/setting-primary.png';

function LiveStreamSettingScreen() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState(POSTS);

    const handleLikePost = (index) => {
        const data = [...posts];
        const item = data[index];
        item.isFavorite = !item.isFavorite;
        if (item.isFavorite) {
            item.numberOfLikes = item.numberOfLikes + 1;
        } else {
            item.numberOfLikes = item.numberOfLikes - 1;
        }
        data[index] = item;
        setPosts(data);
    }

    return (
        <div className="" style={{ position: 'relative' }}>
            <Header type="home" />
            <div className='home main relative flex justify-around md:justify-start'>
                <Sidebar active="settings" />
                <div className='w-[100%] sm:w-[80%] md:w-[60%] lg:w-[50] py-4 px-2 flex flex-wrap'>
                    <div className='w-full flex flex-col'>
                        <div className='shadow p-4 flex flex-col mb-8 bg-white rounded-lg'>
                            <div className='flex justify-between items-center'>
                                <Link to={'/'}>
                                    <img className='w-[18px]' src={backImage} alt='back' />
                                </Link>
                                <h2 className='w-full text-center text-lg font-bold'>Get Started</h2>
                            </div>
                            <p className='text-[#9D9D9D] py-2'>Choose how you want to create your live video</p>
                            <select className='border border-solid border-primary rounded-lg p-2 w-full my-2 font-bold'>
                                <option value={''}>User stream keys</option>
                            </select>
                            <h4 className='text-[#4E4E4E] font-semibold py-2'>Use a Persistent stream key</h4>
                            <p className='text-[#4E4E4E]'>This can be reused every time you go live. You can only broadcast one live video at a time with yourpersistent stream key.</p>
                            <hr className='bg-black my-2' />
                            <p className='text-[#4E4E4E]'>Once a backup stream is added to your live video. it cannot be removed. It will not affect your stream if you choose not to use it.</p>
                        </div>

                        <div className='shadow p-4 flex flex-col mb-8 bg-white rounded-lg'>
                            <div className='flex justify-between items-center'>
                                <img className='w-[18px]' src={settingImage} alt='back' />
                                <h2 className='w-full text-center text-lg font-bold'>Settings</h2>
                            </div>
                            <select className='border border-soild border-primary rounded-lg p-2 w-full my-2 font-bold'>
                                <option value={''}>User stream keys</option>
                            </select>
                            <hr className='bg-black my-1' />
                            <select className='border border-soild border-primary rounded-lg p-2 w-full my-2 font-bold'>
                                <option value={''}>User stream keys</option>
                            </select>
                        </div>

                        <div className='shadow p-4 flex flex-col mb-8 bg-white rounded-lg'>
                            <div className='flex justify-around items-center'>
                                <h2 className='w-full text-center text-lg font-bold'>Live API</h2>
                            </div>
                            <p className='text-[#4E4E4E] py-2'>Copy and past these setting into streaming software.</p>
                            <div className='w-full'>
                                <label className='text-black font-semibold text-lg mb-2'>Sever URL</label>
                                <div className='flex items-center w-full justify-between'>
                                    <input className='border border-solid border-primary rounded-lg px-2 py-1.5 w-full' type='text' value={''} />
                                    <button className='px-2 py-0.5 rounded-lg bg-primary text-white ml-2'>Copy</button>
                                </div>
                            </div>
                            <hr className='bg-black my-2' />
                            <div className='w-full'>
                                <label className='text-black font-semibold text-lg mb-2'>Sever URL</label>
                                <div className='flex items-center w-full justify-between'>
                                    <input className='border border-solid border-primary rounded-lg px-2 py-1.5 w-full' type='text' value={''} />
                                    <button className='px-2 py-0.5 rounded-lg bg-primary text-white ml-2'>Copy</button>
                                </div>
                            </div>
                            <div className='flex w-full justify-around mt-2'>
                                <button className='px-2 py-0.5 rounded-lg bg-primary text-white ml-2'>Event Logs</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LiveStreamSettingScreen;
