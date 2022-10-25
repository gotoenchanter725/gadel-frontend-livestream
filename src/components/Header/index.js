import React from 'react';
import { useNavigate } from "react-router-dom"
import {
  Notifications as NotificationsIcon,
  HeadsetMicRounded as HeadsetMicRoundedIcon,
  MicRounded as MicRoundedIcon,
  VideocamRounded as VideocamRoundedIcon,
  NotificationsRounded as NotificationsRoundedIcon,
  QuestionAnswerRounded as QuestionAnswerRoundedIcon
} from '@mui/icons-material';
import { useStateValue } from 'src/services/state/State';
import { actions } from 'src/services/state/Reducer';
import authService from 'src/services/authService';
import user from 'src/assets/images/image.png';
import MenuIcon from 'src/assets/images/icon/menu.png';
import MusicIcon from 'src/assets/images/icon/music.png';

import "./index.scss"

// Custom Dropdown
export default function Header({
  hideButtons, isCheckout, isAdmin
}) {
  const [{ cartItems, stompClient, access_token }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    dispatch({
      type: actions.SET_ACCESS_TOKEN,
      payload: null
    });
    dispatch({
      type: actions.SET_USERNAME,
      payload: null
    });
    navigate('/login');
    handleCloseDrawer()
  }

  const handleOpenDrawer = () => {
    document.getElementById("mySidebar").style.width = "100%";
    document.getElementById("mySidebar").style.display = "block";
  }

  const handleCloseDrawer = () => {
    document.getElementById("mySidebar").style.display = "none";
  }

  return (
    <div className='px-3 py-4 flex items-center justify-between'>
      <div className='flex items-center'>
        <div className="cursor-pointer w-[18px] md:w-[25px] aspect-[1/1] mx-1 md:mx-2" onClick={() => handleOpenDrawer()}>
          <img src={MenuIcon} className='w-full h-full' />
        </div>
        <div className='flex items-center mr-1' onClick={() => navigate('/')}>
          <div className='w-[30px] sm:w-[40px] md:w-[40px] box-border aspect-[1/1] cursor-pointer flex justify-around items-center ml-1 md:ml-2 p-1.5 md:p-2 shadow shadow-shadow rounded-full'>
            <img src={MusicIcon} className='w-full' />
          </div>
          <div className='text-primary font-bold ml-2 text-md md:text-xl min-w-[90px] md:min-w-[120px]'>Live Stream</div>
        </div>
      </div>
      <div className='flex items-center'>
        <input className='w-full md:min-w-[300px] rounded-full shadow shadow-shadow text-xs sm:text-sm md:text-md px-1.5 md:px-3 py-1 md:py-2 bg-[#FAF7F7]' placeholder='Start typing to search' />
        <div className='flex items-center'>
          <div className='w-[25px] md:w-[35px] aspect-[1/1] cursor-pointer flex justify-around items-center ml-1 md:ml-2 bg-[#FAF7F7] shadow shadow-shadow rounded-full border border-solid border-[#978D8D]'>
            <MicRoundedIcon className='!w-[12px] md:!w-[20px] text-primary' />
          </div>
          <div className='w-[25px] md:w-[35px] aspect-[1/1] cursor-pointer flex justify-around items-center ml-1 md:ml-2 bg-[#FAF7F7] shadow shadow-shadow rounded-full border border-solid border-[#978D8D]'>
            <VideocamRoundedIcon className='!w-[12px] md:!w-[20px] text-primary' />
          </div>
        </div>
      </div>
      <div className='flex items-center'>
        <div className='flex items-center'>
          <div className='w-[25px] md:w-[35px] aspect-[1/1] cursor-pointer flex justify-around items-center ml-1 md:ml-2 bg-[#FAF7F7] shadow shadow-shadow rounded-full border border-solid border-[#978D8D]'>
            <NotificationsIcon className='!w-[12px] md:!w-[20px] text-primary' />
          </div>
          <div className='w-[25px] md:w-[35px] aspect-[1/1] cursor-pointer flex justify-around items-center ml-1 md:ml-2 bg-[#FAF7F7] shadow shadow-shadow rounded-full border border-solid border-[#978D8D]'>
            <QuestionAnswerRoundedIcon className='!w-[12px] md:!w-[20px] text-primary' />
          </div>
        </div>
        <div className='w-[25px] md:w-[35px] aspect-[1/1] ml-1 md:ml-2 cursor-pointer bg-[#FAF7F7] shadow shadow-shadow rounded-full overflow-hidden border border-solid border-[#978D8D]'>
          <img src={user} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
