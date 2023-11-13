import React, { useEffect, useState } from 'react';
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
import LogoIcon from 'src/assets/logo-header.png';

import "./index.scss"
import { settings } from '../../services/Settings';
import MessageDropdown from '../Message/Dropdown';
import NotificationDropdown from '../Notification/Dropdown';
import { getMessage, markAsRead } from 'src/actions/messageActions';

// Custom Dropdown
export default function Header(props) {
  // const [{ cartItems, stompClient, access_token }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState('')
  const [state, setState] = useStateValue();
  const [showMessageDropdown, setShowMessageDropdown] = useState( false );
  const [showNotificationDropdown, setShowNotificationDropdown] = useState( false );
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setUserImg(`${settings.sourceUrl}/avatar/${state.user._id}`)
  })
  // const handleLogout = async () => {
  //   await authService.logout();
  //   dispatch({
  //     type: actions.SET_ACCESS_TOKEN,
  //     payload: null
  //   });
  //   dispatch({
  //     type: actions.SET_USERNAME,
  //     payload: null
  //   });
  //   navigate('/login');
  //   handleCloseDrawer()
  // }
  const toggleMessageDropdown = () => {
    showMessageDropdown?setShowMessageDropdown(false):setShowMessageDropdown(true);
  }
  const toggleNotificationDropdown = () => {
    showNotificationDropdown?setShowNotificationDropdown(false):setShowNotificationDropdown(true);
  }

  const handleOpenDrawer = () => {
    document.getElementById("mySidebar").style.width = "100%";
    document.getElementById("mySidebar").style.display = "block";
  }

  const handleCloseDrawer = () => {
    document.getElementById("mySidebar").style.display = "none";
  }

  useEffect(() => {
    getMessage({unread: true}).then((response) => {
      setMessages( response.payload.messages );
      console.log(response.payload.messages);
    })
  }, []);

  const setMessageAsRead = (index) => {
    const message = messages[index];
    markAsRead(message._id).then((response) => {
      const idx = messages.findIndex((item) => item._id == message._id);
      if( idx >= 0 ) messages.splice( idx, 1 );
      setMessages( [ ...messages ] );
    }).catch((err) => {

    })
  }

  return (
    <div className='px-3 py-4 flex items-center justify-between bg-white shadow-md mb-2' id='header'>
      <div className='flex items-center'>
        <div className="cursor-pointer w-[18px] md:w-[25px] aspect-[1/1] mx-1 md:mx-2" onClick={() => handleOpenDrawer()}>
          <img src={MenuIcon} className='w-full h-full' />
        </div>
        {
          (props.type && props.type == "home") ? (
            <div className='flex items-center mr-1' onClick={() => navigate('/')}>
              <div className='w-[30px] sm:w-[40px] md:w-[50px] box-border aspect-[1/1] cursor-pointer flex justify-around items-center ml-1 md:ml-2 p-1.5 md:p-2 shadow shadow-shadow rounded-full'>
                <img src={MusicIcon} className='w-full' />
              </div>
              <div className='text-primary font-bold ml-2 text-md md:text-xl min-w-[90px] md:min-w-[120px]'>Live Stream</div>
            </div>
          ) : (
            <div className='flex items-center mr-1' onClick={() => navigate('/')}>
              <div className='w-[80px] sm:w-[120px] md:w-[150px] cursor-pointer flex justify-around items-center ml-1 md:ml-2'>
                <img src={LogoIcon} className='w-full' />
              </div>
            </div>
          )
        }
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
            <NotificationsIcon className='!w-[12px] md:!w-[20px] text-primary' onClick={(e) => {toggleNotificationDropdown()}}/>
            {showNotificationDropdown&&<NotificationDropdown/>}
            {showNotificationDropdown&&<div className={`overlay`} onClick={() => (setShowNotificationDropdown(false))}></div>}
          </div>
          <div className='w-[25px] md:w-[35px] aspect-[1/1] cursor-pointer flex justify-around items-center ml-1 md:ml-2 bg-[#FAF7F7] shadow shadow-shadow rounded-full border border-solid border-[#978D8D]'>
            <QuestionAnswerRoundedIcon onClick={(e) => {toggleMessageDropdown()}} className='!w-[12px] md:!w-[20px] text-primary' />
            {showMessageDropdown&&<MessageDropdown messages={messages} onClickRead={setMessageAsRead}/>}
            {showMessageDropdown&&<div className={`overlay`} onClick={() => (setShowMessageDropdown(false))}></div>}
            
          </div>
        </div>
        <div className='w-[25px] md:w-[35px] aspect-[1/1] ml-1 md:ml-2 cursor-pointer bg-[#FAF7F7] shadow shadow-shadow rounded-full overflow-hidden border border-solid border-[#978D8D]'>
          <img src={userImg} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
