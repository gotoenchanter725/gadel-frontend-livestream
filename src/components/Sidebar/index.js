import React from 'react';
import { useNavigate } from 'react-router';
import {
  Home as HomeIcon,
  Person as ProfileIcon,
  GTranslateRounded as GTranslateRoundedIcon,
  SupportAgentRounded as SupportAgentRoundedIcon,
  SettingsRounded as SettingsRoundedIcon
} from '@mui/icons-material';
import { useStateValue } from 'src/services/state/State';
import { actions } from 'src/services/state/Reducer';
import authService from 'src/services/authService';
import 'src/App.css';

function Sidebar({ active }) {
  const [{ cartItems, stompClient }, dispatch] = useStateValue();
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
  }

  return (
    <div className='main-sidebar-container'>
      <div className='sidebar'>
        <div className={`sidebar-row ${active === 'home' && 'sidebar-row-active'}`} onClick={() => navigate('/')}>
          <HomeIcon className={`sidebar-icon ${active !== 'home' && 'inactive'}`} />
          <div className='sidebar-item sidebar-item-active'>
            <div className={`sidebar-item ${active === 'home' && 'sidebar-item-active'}`} style={{marginLeft: 0}}>
              Home
            </div>
          </div>
        </div>
        <div className={`sidebar-row ${active === 'profile' && 'sidebar-row-active'}`} onClick={() => navigate('/profile')}>
          <ProfileIcon className={`sidebar-icon ${active !== 'profile' && 'inactive'}`} />
          <div
            className={`sidebar-item ${active === 'profile' && 'sidebar-item-active'}`}>
            Profile
          </div>
        </div>
        <div
          className={`sidebar-row ${active === 'language' && 'sidebar-row-active'}`}
          onClick={() => navigate('/history')}
        >
          <GTranslateRoundedIcon className={`sidebar-icon ${active !== 'language' && 'inactive'}`} />
          <div className={`sidebar-item ${active === 'language' && 'sidebar-item-active'}`} >
            Language
          </div>
        </div>
        <div
          className={`sidebar-row ${active === 'support' && 'sidebar-row-active'}`}
          onClick={() => navigate('/transactions')}
        >
          <SupportAgentRoundedIcon className={`sidebar-icon ${active !== 'support' && 'inactive'}`} />
          <div className={`sidebar-item ${active === 'support' && 'sidebar-item-active'}`} >
            Support
          </div>
        </div>
        <div
          className={`sidebar-row ${active === 'settings' && 'sidebar-row-active'}`}
          onClick={() => navigate('/transactions')}
        >
          <SettingsRoundedIcon className={`sidebar-icon ${active !== 'settings' && 'inactive'}`} />
          <div className={`sidebar-item ${active === 'settings' && 'sidebar-item-active'}`} >
            Settings
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
