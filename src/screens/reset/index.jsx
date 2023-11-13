import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword, sendPasswordResetRequest } from 'src/actions/accountActions';
import { useStateValue } from 'src/services/state/State';
import { actions } from 'src/services/state/Reducer';
import { CircularProgress, Snackbar } from '@mui/material';
import { ScrollToTop } from 'src/components';
import { verifyEmail } from 'src/services/Validations';
import logo from 'src/assets/icon-white.png';
import passwordImage from 'src/assets/images/icon/password.png';
import userEmailImage from 'src/assets/images/icon/user-email.png';
import repasswordImage from 'src/assets/images/icon/repassword.png';
import SendIcon from '@mui/icons-material/Send';
import './reset.scss';

const MODE_INPUT_EMAIL = "MODE_INPUT_EMAIL";
const MODE_INPUT_PASSWORD = "MODE_INPUT_PASSWORD";

function ResetScreen() {
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inValidEmail, setInValidEmail] = useState(false);
  const [inValidPassword, setInValidPassword] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [mode, setMode] = useState(MODE_INPUT_EMAIL);
  const [passwordMismatch, setPasswordMismatch] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetCode, setResetCode] = useState("")

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    if (password !== e.target.value && password.length <= e.target.value.length) {
      setPasswordMismatch(true)
    } else if (password === e.target.value) {
      setPasswordMismatch(false)
    }
    setConfirmPassword(e.target.value)
  }

  const handelChangeResetCode = ( e ) => {
    setResetCode( e.target.value )
  }

  const handleSubmit = async () => {
    if (email === '') {
      alert('Please enter email')
    } else if (password === '') {
      alert('Please enter password')
    } else if( passwordMismatch ){
      alert("Password mismatch")
    } else {
      setOpen(true)
      try {
        resetPassword(email, password, resetCode).then((response) => {
          navigate("/login")
          setOpen( false )
        }).catch( (err) => {
          setError(err.message);
          setOpen( false );
          setOpenError( true );
        })
      } catch (err) {
        setError(err.message);
        setOpenError( true )
        setOpen( false )
      }
      
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

  const handleSendRequest = () => {
    if (email.includes('@') && email.includes('.') && !verifyEmail(email)) {
      setInvalidEmail(true)
      alert("invalid email address.")
    } else if (verifyEmail(email)) {
      setInvalidEmail(false)
      setOpen( true )
      sendPasswordResetRequest(email).then((response) => {
        setOpen( false )
        setMode(MODE_INPUT_PASSWORD)
      }).catch( err => {
        setError( err.message )
        setOpenError( true );
        setOpen( false )
      })
    }
    else {
      alert("Please input your email address to reset your password.")
    }
  }

  return (
    <div className="login">
      <ScrollToTop />
      <div className='flex flex-col w-full pt-[100px] sm:pt-[200px] items-center bg-user-background h-[1000px] sm:h-[1200px] bg-100% bg-no-repeat'>
        <img src={logo} className='logo' />
        <div className="pt-[50px] px-4 w-full flex justify-around items-center">
          <div className="right-container rounded-2xl bg-white w-full max-w-[555px] min-w-[300px] overflow-hidden">
            <h4 className='w-full sm:pb-[80px] pb-[50px] sm:pt-[100px] pt-[60px]  font-bolder text-5xl text-center text-white bg-auth-header-background bg-100% my-0'>Reset Password</h4>
            <div className="flex flex-col items-center w-full bg-[#D5D5D5] py-4 sm:py-6 px-4 sm:px-8">
              
              {mode == MODE_INPUT_PASSWORD ? (
                <>
                  <div className="w-full flex items-center justify-between mb-6">
                    <img className='w-[20px] mr-2' src={passwordImage} alt='Password' />
                    <input
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                      className={`border border-solid border-input-border focus:border-blue-400 px-3 py-2 w-full shadow sm:!rounded-md !rounded-full ${passwordMismatch && 'text-input-invalid'}`}
                      type='password'
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="w-full flex items-center justify-between mb-6">
                    <img className='w-[20px] mr-2' src={repasswordImage} alt='Re-Enter Password' />
                    <input
                      placeholder="Re-Enter Password"
                      aria-label="Re-Enter Password"
                      aria-describedby="basic-addon1"
                      className={`border border-solid border-input-border focus:border-blue-400 px-3 py-2 w-full shadow sm:!rounded-md !rounded-full ${passwordMismatch && 'text-input-invalid'}`}
                      type='password'
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </div>
                  <div className="w-full flex items-center justify-between mb-6">
                    <img className='w-[20px] mr-2' src={repasswordImage} alt='Rest Code' />
                    <input
                      placeholder="Rest Code"
                      aria-label="Rest Code"
                      aria-describedby="basic-addon1"
                      className={`border border-solid border-input-border focus:border-blue-400 px-3 py-2 w-full shadow sm:!rounded-md !rounded-full ${passwordMismatch && 'text-input-invalid'}`}
                      value={resetCode}
                      onChange={handelChangeResetCode}
                    />
                    <div className={'bg-[#FF0000] ml-1 rounded-md flex flex-col justify-center py-[10px] px-5 font-bold cursor-pointer text-white text-[20px] h-[42px] w-[60px] text-center'} onClick={handleSubmit}>
                      {open?<CircularProgress size={20} />:(<SendIcon/>)}
                    </div>
                  </div>
                  {passwordMismatch && (
                    <div className='password-mismatch'>
                      Passwords does not match.
                    </div>
                  )}
                </>
              ): (
                <div className="w-full flex items-center justify-between mb-2">
                  <img className='w-[20px] mr-2' src={userEmailImage} alt='user e-mail' />
                  <input
                    placeholder="Email"
                    className={`border border-solid border-input-border focus:border-blue-400 px-3 py-2 grow shadow sm:!rounded-md !rounded-full ${invalidEmail && 'text-input-invalid'}`}
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => !verifyEmail(email) && setInvalidEmail(true)}
                  />
                  <div className={'bg-[#FF0000] ml-1 rounded-md flex flex-col justify-center py-[10px] px-5 font-bold cursor-pointer text-white text-[20px] h-[42px] w-[60px] text-center'} onClick={handleSendRequest}>
                    {open?<CircularProgress size={20} />:(<SendIcon/>)}
                  </div>
                </div>
              )}
              <div className="have-an-account mb-4">
                <div className='text-button-login' onClick={() => navigate('/login')}>
                  Login
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
        message={error}
      />
    </div>
  );
}

export default ResetScreen;
