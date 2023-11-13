import propTypes from 'prop-types';

import "./index.scss"
import { settings } from '../../services/Settings';
import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import { MarkEmailReadOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useContext } from 'react';
import { StateContext } from 'src/App';
import moment from 'moment';

const NotificationDropdown = ( {} ) => {
    
    const navigate = useNavigate();
    const state = useContext(StateContext);

    return (
        <div id='notification-dropdown' className='notification-dropdown w-[200px] top-[70px] sm:w-[250px] sm:top-[80px] md:w-[300px] md:top-[90px] z-10 rounded-md'>
            <div className='header flex'>
                <div className='title text-[15px] md:text-[20px]'>Notifications</div>
                {/* <div onClick={() => {navigate("/notification")}} className="cursor-pointer">
                    <KeyboardDoubleArrowRight/>
                </div> */}
            </div>
            <div className='notification-list max-h-[250px] md:max-h-[300px] overflow-scroll scrollbar-thin scroll-smooth scrollbar-w-[3px] scrollbar-thumb-slate-400 scrollbar-thumb-rounded-lg'>
                {state.notifications.map((item, index) => {
                    return (
                        <div className='notification flex space-x-2 shadow-sm' key={`mlist-${index}`}>
                            <img src={`${settings.sourceUrl}/avatar/${item.userId}`} className="rounded-full w-[35px] h-[35px] min-w-[35px]" alt="img" />
                            <div className='content overflow-hidden h-[35px] grow'>
                                <p className=' break-words text-gray-600 text-sm text-justify indent-2 w-full'>{ item.text }</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NotificationDropdown;