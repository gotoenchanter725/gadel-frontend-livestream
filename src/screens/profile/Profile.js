import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Header, Footer, Sidebar
} from 'src/components';
import './Profile.css';

import { POSTS } from 'src/mock/mockData';

import profileImage from "../../assets/images/profile.png";
import messageImage from "../../assets/images/icon/message-white.png";
import followAddImage from "../../assets/images/icon/followAdd.png";
import postImage from "../../assets/images/icon/post.png";
import supportImage from "../../assets/images/icon/support.png";
import officialImage from "../../assets/images/icon/official.png";

function ProfileScreen() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(POSTS);

  return (
    <div className="profile" style={{ position: 'relative' }}>
      <div className='flex flex-col relative w-full'>
        <div className='min-h-[200px] bg-profile-background bg-cover'></div>
        <div className='flex w-full p-4 mb-2 md:mb-4'>
          <div className='relative w-[100px] md:w-[200px] mr-2'>
            <img className='absolute left-0 -top-[70px] md:-top-[120px] w-[100px] md:w-[200px] aspect-[1/1]' src={profileImage} alt={'profile'} />
          </div>
          <div className='flex flex-wrap items-center justify-between w-[calc(100%_-_100px)] md:w-[calc(100%_-_200px)]'>
            <div className='flex jusstify-start w-full md:w-auto'>
              <Link className='p-1.5 mr-1.5 font-semibold text-md md:text-lg' to={'/'}>Videos</Link>
              <Link className='p-1.5 mr-1.5 font-semibold text-md md:text-lg' to={'/'}>Following</Link>
              <Link className='p-1.5 mr-1.5 font-semibold text-md md:text-lg' to={'/'}>Likes</Link>
              <Link className='p-1.5 mr-1.5 font-semibold text-md md:text-lg' to={'/'}>About</Link>
              <Link className='p-1.5 mr-1.5 font-semibold text-md md:text-lg' to={'/'}>More</Link>
            </div>
            <div className='flex justify-end w-full md:w-auto'>
              <button className='flex items-center rounded-lg text-white mr-2 px-2 py-1.5 bg-[#B7B7B7]'>
                <img className='h-[20px] mr-2' src={messageImage} alt={'message'} />
                Message
              </button>
              <button className='flex items-center rounded-lg text-white px-2 py-1.5 bg-primary'>
                <img className='h-[20px] mr-2' src={followAddImage} alt={'Follows'} />
                Follow
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col px-4 py-6'>
          <div className='flex flex-col w-full pl-6'>
            <div className='flex justify-between items-center w-full'>
              <div className=''>
                <h2 className='text-[#515151] text-4xl pb-2 font-bold flex items-center'>
                  <span>Umer57</span>
                  <img className='w-[30px] aspect-[1/1] ml-2' src={officialImage} alt={'official'} />
                </h2>
                <p className='text-[#575757] font-semibold text-lg'>Pakistan</p>
              </div>
              <div className='flex items-center'>
                <button className='flex items-center rounded-full text-white mr-2 px-3 py-1.5 bg-[#B7B7B7]'>
                  <img className='h-[20px] mr-2' src={postImage} alt={'Post'} />
                  Post
                </button>
                <button className='flex items-center rounded-full text-white px-3 py-1.5 bg-primary'>
                  <img className='h-[20px] mr-2' src={supportImage} alt={'Support'} />
                  Support
                </button>
              </div>
            </div>
            <p className='text-[#868686] font-semibold text-lg'>47 Videos | 2,21 Followers | 2,54 Likes</p>
          </div>
          <div className='w-full py-4 md:px-2 flex flex-wrap px-3'>
            {
              posts.map((item, index) => {
                return (
                  <div key={index} className='w-full sm:w-[50%] lg:w-[33%] xl:w-[25%] aspect-[10/9] p-2 md:p-3'>
                    <div className='flex flex-col justify-end relative w-full h-full rounded-md overflow-hidden'>
                      <img className='-z-[10] absolute left-0 top-0 w-full h-full' src={item.img} alt='post image' />
                      <div className='px-2 py-4 bg-[#ff6262b2] min-h-[80px]'>
                        <h4 className='font-bold text-white text-lg px-2'>
                          {"What is Lorem Ipsum?"}
                        </h4>
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
    </div>
  );
}

export default ProfileScreen;
