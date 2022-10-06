import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
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
import { countries } from 'src/services/Settings';
import './Register.css';

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
    <div className="login">
      <ScrollToTop />
      <div className='top-container'>
        <img src={logo} className='logo' />
      </div>
      <div className="right">
        <div className="right-container">
          <div className="form">
            <div className="form-input">
              <h4 className='title' style={{ fontWeight: 'bold' }}>Sign Up</h4>
            </div>
            <div className="form-input-row">
              <Form.Control
                placeholder="First Name"
                aria-label="First Name"
                aria-describedby="basic-addon1"
                className={`text-input`}
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <Form.Control
                placeholder="Last Name"
                aria-label="Last Name"
                aria-describedby="basic-addon1"
                className={`text-input`}
                value={lastName}
                style={{ marginLeft: 10 }}
                onChange={handleLastNameChange}
              />
            </div>
            <div className="form-input">
              <Form.Control
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                className={`text-input ${invalidEmail && 'text-input-invalid'}`}
                value={email}
                onChange={handleEmailChange}
                onBlur={() => !verifyEmail(email) && setInvalidEmail(true)}
              />
            </div>
            <div className="form-input-row">
              <Form.Control
                placeholder="Phone"
                aria-label="Phone"
                aria-describedby="basic-addon1"
                className={`text-input ${invalidPhone && 'text-input-invalid'}`}
                value={phone}
                onChange={handlePhoneChange}
                onBlur={() => phone.length !== 10 && setInvalidPhone(true)}
              />
              <FormControl variant="standard" style={{ width: '105%', marginLeft: 10 }}>
                <Autocomplete
                  label="Country"
                  value={country}
                  options={countries}
                  onChange={handleCountryChange}
                  classes={{
                    input: 'font-family',
                  }}
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
            <div className="form-input">
              <Form.Control
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                className={`text-input ${passwordMismatch && 'text-input-invalid'}`}
                type='password'
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-input">
              <Form.Control
                placeholder="Re-Enter Password"
                aria-label="Re-Enter Password"
                aria-describedby="basic-addon1"
                className={`text-input ${passwordMismatch && 'text-input-invalid'}`}
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
            <div className='forgot-password-button'>
              Forgot Password?
            </div>
            {open ? (
              <div className='register-form-button'>
                <CircularProgress />
              </div>
            ) :
              (<div className='register-form-button' onClick={handleSubmit}>
                Sign up
              </div>)}
            <div className="have-an-account">
              Already have an account?
              <div className='text-button-login' onClick={() => navigate('/login')}>
                Sign in
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
