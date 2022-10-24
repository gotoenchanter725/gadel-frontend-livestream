import React from 'react';
import { useNavigate } from "react-router-dom"
import {
  Menu as MenuIcon,
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
import 'src/App.css';

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
    <div className='header-row'>
      <div className='header-logo-container'>
        <div className="" onClick={() => handleOpenDrawer()}>
          <MenuIcon className='menu-icon cursor-pointer mr-2' size="large" />
        </div>
        <div className='logo-container' onClick={() => navigate('/')}>
          <div className='icon-container'>
            <HeadsetMicRoundedIcon className='logo' />
          </div>
          <div className='header-title'>Live Stream</div>
        </div>
      </div>
      <div className='nav-search'>
        <input className='search-bar' placeholder='Start typing to search' />
        <div className='nav-container'>
          <div className='header-icon-container'>
            <MicRoundedIcon className='small-icon' />
          </div>
          <div className='header-icon-container'>
            <VideocamRoundedIcon className='small-icon' />
          </div>
        </div>
      </div>
      <div className='header-right'>
        <div className='nav-container'>
          <div className='header-icon-container'>
            <NotificationsIcon className='small-icon' />
          </div>
          <div className='header-icon-container'>
            <QuestionAnswerRoundedIcon className='small-icon' />
          </div>
        </div>
        <div className='header-icon-container'>
          <img src={user} className="user-image" />
        </div>
      </div>
    </div>
  );
}
