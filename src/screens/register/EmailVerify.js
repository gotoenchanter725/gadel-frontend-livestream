import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailVerify } from 'src/actions/accountActions';
import { useStateValue } from 'src/services/state/State';
import {
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { ScrollToTop } from 'src/components';
import logo from 'src/assets/icon-white.png';
import './Register.scss';

function RegisterScreen() {
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false)
  const [verifyCode, setVerifyCode] = useState('')
  const [invalidVerifyCode, setInvalidVerifyCode] = useState( true )

  const handleSubmit = async (e) => {
    if (verifyCode === '' || invalidVerifyCode == true) {
      alert('Please enter verify code')
    } else {
      setOpen(true)
      const res = await emailVerify(verifyCode);
      if (res && res.payload && res.payload.res.status) {
        navigate('/login');
      } else {
        setOpenError(true)
      }
      setOpen(false)
    }
  }

  const handleVerifyCodeChange = (e) => {
    setVerifyCode(e.target.value);
    if (e.target.value === null || e.target.value === '' || e.target.value.length != 6) {
      setInvalidVerifyCode(true)
    } else {
      setInvalidVerifyCode(false)
    }
  }

  return (
    <div className="register">
      <ScrollToTop />
      <div className='flex flex-col w-full pt-[150px] items-center bg-user-background sm:h-[1300px] h-[1300px] bg-100% bg-no-repeat'>
        <img src={logo} className='logo' />
        <div className="pt-[50px] px-4 w-full flex justify-around items-center">
          <div className="rounded-2xl bg-white overflow-hidden w-full max-w-[555px] min-w-[300px]">
            <h4 className='w-full pb-[50px] sm:pb-[80px] pt-[70px] sm:pt-[100px] font-bolder text-5xl text-center text-white bg-auth-header-background bg-100% my-0' style={{ fontWeight: 'bold' }}>Email Verify</h4>
            <div className="flex flex-col items-center w-full bg-[#D5D5D5] py-4 sm:py-12 !px-4 sm:!px-8">
              <div className="w-full flex items-center justify-between mb-6">
                <input
                  placeholder="Verify Code"
                  aria-label="Verify Code"
                  aria-describedby="basic-addon1"
                  className={`border border-solid border-input-border focus:border-blue-400 px-3 py-2 w-full shadow sm:!rounded-md !rounded-full verify-code ${invalidVerifyCode && 'text-input-invalid'}`}
                  value={verifyCode}
                  onChange={handleVerifyCodeChange}
                  type="text"
                />
              </div>
              {open ? (
                <div className='bg-[#FF0000] rounded-md py-2 px-5 font-bold text-md cursor-pointer text-white'>
                  <CircularProgress />
                </div>
              ) :
                (<div className='bg-[#FF0000] rounded-md py-2 px-5 font-bold text-md cursor-pointer text-white' onClick={handleSubmit}>
                  Verify Email
                </div>)}
              <div className="have-an-account !mt-2 sm:!mt-3 !text-sm sm:!text-md">
                <div className='text-button-login' onClick={() => navigate('/login')}>
                  Sign in
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
        message="Invalid Verify Code"
      />
    </div>
  );
}

export default RegisterScreen;
