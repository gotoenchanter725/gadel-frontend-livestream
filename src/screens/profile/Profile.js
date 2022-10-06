import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Header, Footer, Sidebar
} from 'src/components';
import './Profile.css';

function ProfileScreen() {
  const navigate = useNavigate();

  return (
    <div className="profile" style={{ position: 'relative' }}>
      <Header />
      <div className='main'>
        <Sidebar active="profile" />
        <div className='main-container'>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileScreen;
