import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { login } from 'src/actions/accountActions';
import { useStateValue } from 'src/services/state/State';
import { actions } from 'src/services/state/Reducer';
import { CircularProgress, Snackbar } from '@mui/material';
import { ScrollToTop } from 'src/components';
import { verifyEmail } from 'src/services/Validations';
import logo from 'src/assets/icon-white.png';
import './Login.css';

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
      <div className='top-container'>
        <img src={logo} className='logo' />
      </div>
      <div className="right">
        <div className="right-container">
          <div className="form">
            <div className="form-input">
              <h4 className='title' style={{ fontWeight: 'bold' }}>Sign In</h4>
            </div>
            <div className="form-input">
              <Form.Control
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                className={`text-input ${invalidEmail && 'text-input-invalid'}`}
                value={email}
                style={{ marginTop: 15 }}
                onChange={handleEmailChange}
                onBlur={() => !verifyEmail(email) && setInvalidEmail(true)}
              />
            </div>
            <div className="form-input">
              <Form.Control
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                className="text-input"
                type='password'
                value={password}
                style={{ marginTop: 15 }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='forgot-password-button'>
              Forgot Password?
            </div>
            {open ? (
              <div className='register-form-button'>
                <CircularProgress />
              </div>
            ) :
              (<div className='register-form-button' onClick={handleSubmit}>
                Sign in
              </div>)}
            <div className="have-an-account">
              Don't have an account?
              <div className='text-button-login' onClick={() => navigate('/register')}>
                Sign up
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
