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
import 'src/App.scss';
import ContactImage from 'src/assets/images/contact.png'

// Custom Footer
export default function Footer() {
  return (
    <div className="pt-12 pb-8">
      <div className="px-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="w-[200px] flex flex-col order-3 sm:order-1 mt-4">
          <button className="footer-link !text-center sm:!text-left font-semibold" type="button">Terms & Conditions</button>
          <button className="footer-link !text-center sm:!text-left font-semibold !mt-3" type="button">Privacy Policy</button>
        </div>
        <div className='flex flex-col justify-between items-center order-1 sm:order-2'>
          <img className='rounded-full w-[70px]' src={ContactImage} alt="contact" />
          <p className='footer-link !text-center !text-md !font-bold !text-primary'>contact@gadelapp.com</p>
        </div>
        <div className="w-[200px flex justify-end !h-full items-end order-2 sm:order-3 mt-4">
          <FacebookIcon className="footer-icon !mx-2 sm:!mx-1" />
          <InstagramIcon className="footer-icon !mx-2 sm:!mx-1" />
          <LinkedinIcon className="footer-icon !mx-2 sm:!mx-1" />
          <TwitterIcon className="footer-icon !mx-2 sm:!mx-1" />
        </div>
      </div>
      <div className='!w-full mt-4 pt-4 flex !justify-around border-t border-solid border-[#C8BDBD]'>
        <div className="footer-text">
          © 2022 Logo All Rights Reserved
        </div>
      </div>
    </div>
  );
}
