import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from 'src/actions/accountActions';
import { useStateValue } from 'src/services/state/State';
import { actions } from 'src/services/state/Reducer';
import { CircularProgress, Snackbar } from '@mui/material';
import { ScrollToTop } from 'src/components';
import { verifyEmail } from 'src/services/Validations';
import logo from 'src/assets/icon-white.png';
import passwordImage from 'src/assets/images/icon/password.png';
import userEmailImage from 'src/assets/images/icon/user-email.png';
import './Login.scss';

function LoginScreen() {
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inValidEmail, setInValidEmail] = useState(false);
  const [inValidPassword, setInValidPassword] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)

  const handleSubmit = async () => {
    if (email === '') {
      alert('Please enter username')
    } else if (password === '') {
      alert('Please enter password')
    } else {
      setOpen(true)
      const res = await login(email, password);
      if (res && res.payload && res.payload.user) {
        dispatch({
          type: actions.SET_ACCESS_TOKEN,
          payload: res.payload.user.token,
        });
        dispatch(res)
        navigate('/');
      } else {
        setOpenError(true)
      }
      setOpen(false)
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value.includes('@') && e.target.value.includes('.') && !verifyEmail(e.target.value)) {
      setInvalidEmail(true)
    } else if (verifyEmail(e.target.value)) {
      setInvalidEmail(false)
    }
  }

  return (
    <div className="login">
      <ScrollToTop />
      <div className='flex flex-col w-full pt-[100px] sm:pt-[200px] items-center bg-user-background h-[1000px] sm:h-[1200px] bg-100% bg-no-repeat'>
        <img src={logo} className='logo' />
        <div className="pt-[50px] px-4 w-full flex justify-around items-center">
          <div className="right-container rounded-2xl bg-white w-full max-w-[555px] min-w-[300px] overflow-hidden">
            <h4 className='w-full sm:pb-[80px] pb-[50px] sm:pt-[100px] pt-[60px]  font-bolder text-5xl text-center text-white bg-auth-header-background bg-100% my-0'>Sign In</h4>
            <div className="flex flex-col items-center w-full bg-[#D5D5D5] py-4 sm:py-6 px-4 sm:px-8">
              <div className="w-full flex items-center justify-between mb-6">
                <img className='w-[20px] mr-2' src={userEmailImage} alt='user e-mail' />
                <input
                  placeholder="Email"
                  className={`border border-solid border-input-border focus:border-blue-400 px-3 py-2 w-full shadow sm:!rounded-md !rounded-full ${invalidEmail && 'text-input-invalid'}`}
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => !verifyEmail(email) && setInvalidEmail(true)}
                />
              </div>
              <div className="w-full flex items-center justify-between mb-6">
                <img className='w-[20px] mr-2' src={passwordImage} alt='user e-mail' />
                <input
                  placeholder="Password"
                  className="border border-solid border-input-border focus:border-blue-400 px-3 py-2 w-full shadow sm:!rounded-md !rounded-full"
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {open ? (
                <div className='bg-[#FF0000] rounded-md py-2 px-5 font-bold text-md cursor-pointer text-white '>
                  <CircularProgress />
                </div>
              ) :
                (<div className='bg-[#FF0000] rounded-md py-2 px-5 font-bold text-md cursor-pointer text-white ' onClick={handleSubmit}>
                  Sign in
                </div>)}
              <div className="have-an-account mb-4">
                Don't have an account?
                <div className='text-button-login' onClick={() => navigate('/register')}>
                  Sign up
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
        message="Invalid email or password."
      />
    </div>
  );
}

export default LoginScreen;
