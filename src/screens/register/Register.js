import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from 'src/actions/accountActions';
import { useStateValue } from 'src/services/state/State';
import { actions } from 'src/services/state/Reducer';
import {
  CircularProgress,
  Snackbar,
  Autocomplete,
  FormControl,
  TextField,
} from '@mui/material';
import { ScrollToTop } from 'src/components';
import { verifyEmail } from 'src/services/Validations';
import logo from 'src/assets/icon-white.png';
import passwordImage from 'src/assets/images/icon/setpassword.png';
import repasswordImage from 'src/assets/images/icon/repassword.png';
import messageImage from 'src/assets/images/icon/message.png';
import userImage from 'src/assets/images/icon/user.png';
import callImage from 'src/assets/images/icon/call.png';
import flagImage from 'src/assets/images/icon/flag.png';
import { countries } from 'src/services/Settings';
import './Register.scss';

function RegisterScreen() {
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidPhone, setInvalidPhone] = useState(false)
  const [passwordMismatch, setPasswordMismatch] = useState(false)

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

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }

  const handleLastNameChange = (e) => {
    setLastName(e.targe.value)
  }

  const handlePhoneChange = (e) => {
    if (e.target.value.length === 10) {
      setInvalidPhone(false)
    }
    setPhone(e.target.value)
  }

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

  const handleCountryChange = (e, value) => {
    setCountry(value)
  }

  return (
    <div className="register">
      <ScrollToTop />
      <div className='flex flex-col w-full pt-[150px] items-center bg-user-background sm:h-[1300px] h-[1300px] bg-100% bg-no-repeat'>
        <img src={logo} className='logo' />
        <div className="pt-[50px] px-4 w-full flex justify-around items-center">
          <div className="rounded-2xl bg-white overflow-hidden w-full max-w-[555px] min-w-[400px]">
            <h4 className='w-full sm:pb-[80px] pb-[60px] sm:pt-[100px] pt-[80px] font-bolder text-5xl text-center text-white bg-auth-header-background bg-100% my-0' style={{ fontWeight: 'bold' }}>Sign Up</h4>
            <div className="flex flex-col items-center w-full bg-[#D5D5D5] py-12 !px-6 sm:!px-8">
              <div className="w-full flex items-center justify-between mb-6">
                <img className='w-[20px] mr-2' src={userImage} alt='user' />
                <input
                  className="border border-solid border-input-border focus:border-blue-400 px-3 py-2 w-full shadow sm:!rounded-md !rounded-full"
                  placeholder="First Name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
                <input
                  placeholder="Last Name"
                  aria-label="Last Name"
                  className="border border-solid border-input-border focus:border-blue-400 px-3 py-2 w-full shadow sm:!rounded-md !rounded-full"
                  aria-describedby="basic-addon1"
                  value={lastName}
                  style={{ marginLeft: 10 }}
                  onChange={handleLastNameChange}
                />
              </div>
              <div className="w-full flex items-center justify-between mb-6">
                <img className='w-[20px] mr-2' src={messageImage} alt='email' />
                <input
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  className={`border border-solid border-input-border focus:border-blue-400 px-3 py-2 w-full shadow sm:!rounded-md !rounded-full ${invalidEmail && 'text-input-invalid'}`}
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => !verifyEmail(email) && setInvalidEmail(true)}
                />
              </div>
              <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-6">
                <div className='w-full flex items-center justify-between'>
                  <img className='w-[20px] mr-2' src={callImage} alt='call' />
                  <input
                    placeholder="Phone"
                    aria-label="Phone"
                    aria-describedby="basic-addon1"
                  className={`border border-solid border-input-border focus:border-blue-400 px-3 py-2 w-full shadow sm:!rounded-md !rounded-full ${invalidPhone && 'text-input-invalid'}`}
                  value={phone}
                    onChange={handlePhoneChange}
                    onBlur={() => phone.length !== 10 && setInvalidPhone(true)}
                  />
                </div>
                <div className='w-full flex items-center justify-between !ml-0 sm:!ml-2 !mt-6 sm:!mt-0'>
                  <img className='w-[20px] !mr-2' src={flagImage} alt='flag' />
                  <FormControl variant="standard" style={{ width: '105%' }}>
                    <Autocomplete
                      label="Country"
                      value={country}
                      options={countries}
                      onChange={handleCountryChange}
                      classes='bg-white'
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            '& legend': { display: 'none' },
                            '& fieldset': { top: 0 },
                          }}
                          size='small'
                          placeholder="Country"
                          style={{ height: 38 }}
                        />
                      )}
                    />
                  </FormControl>
                </div>
              </div>
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
              {passwordMismatch && (
                <div className='password-mismatch'>
                  Passwords does not match.
                </div>
              )}
              {open ? (
                <div className='bg-[#FF0000] rounded-md py-2 px-5 font-bold text-md cursor-pointer text-white'>
                  <CircularProgress />
                </div>
              ) :
                (<div className='bg-[#FF0000] rounded-md py-2 px-5 font-bold text-md cursor-pointer text-white' onClick={handleSubmit}>
                  Sign up
                </div>)}
              <div className="have-an-account mt-3">
                Already have an account?
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
        message="Invalid email or password."
      />
    </div>
  );
}

export default RegisterScreen;
