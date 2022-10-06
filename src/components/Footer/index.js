import React from 'react';
import { useNavigate } from "react-router-dom"
import {
  Facebook as FacebookIcon,
} from 'react-feather';
import {
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedinIcon
} from '@mui/icons-material';
import 'src/App.css';

// Custom Footer
export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-icons">
        <div className="footer-left-container">
          <button className="footer-link" type="button">Terms & Conditions</button>
          <button className="footer-link" type="button">Privacy Policy</button>
        </div>
        <div className="footer-right-container">
          <FacebookIcon className="footer-icon" />
          <InstagramIcon className="footer-icon" />
          <LinkedinIcon className="footer-icon" />
          <TwitterIcon className="footer-icon" />
        </div>
      </div>
      <div className='footer-icons' style={{justifyContent: 'center'}}>
        <div className="footer-text">
          © 2022 Logo All Rights Reserved
        </div>
      </div>
    </div>
  );
}
