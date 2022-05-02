import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';
import image from '../../images/login-background.png'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = async e => {
    e.preventDefault();
    return await dispatch(login('demo@aa.io', 'password'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/@me' />;
  }

  return (
    <div className='whole-page-div'>
      <div className='background-image-container'>
        <img className='background-image' src={image} />
      </div>
      <div className='login-form-container'>
        <div className='login-form-text-container'>
          <h1>Welcome back!</h1>
          <p className='login-form-p'>We're so excited to see you again!</p>
        </div>
        <div className='login-form-form-container'>
          <form onSubmit={onLogin} className='login-form'>
            {/* <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div> */}
            <div className='login-form-input-fields'>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  className='login-form-email-input'
                  name='email'
                  type='text'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  className='login-form-password-input'
                  name='password'
                  type='password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
            </div>
          </form>
        </div>
        <div className='login-form-buttons-container'>
          <button type='submit' className='login-button login-form-button'>Login</button>
          <button className='demo-user-button login-form-button' onClick={demoUser}>Demo User</button>
        </div>
        <p className='login-form-register-p'>Need an account? <span><Link to='/sign-up' className='login-form-register-link'> Register</Link></span></p>
      </div>
    </div>
  );
};

export default LoginForm;

