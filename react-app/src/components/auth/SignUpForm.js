import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import './LoginForm.css';
import image from '../../images/login-background.png'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }


  return (
    <div className='whole-page-div'>
      <div className='background-image-container'>
        <img className='background-image' src={image} alt='Discord Background' />
      </div>
      <div className='login-form-container'>
        <div className='login-form-text-container'>
          <h1>Create an account.</h1>
        </div>
        <div className='login-form-form-container'>
          <form onSubmit={onSignUp} className='login-form'>
            {/* <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div> */}
            <div className='login-form-input-fields'>
              <div className='form-group'>
                <label>User Name</label>
                <input
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                  className='login-form-email-input'
                />
                {/* error handling needed */}
              </div>
              <div className='form-group'>
                <label>Email</label>
                <input
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                  className='login-form-email-input'
                ></input>
                {errors?.password?.map(error => {
                  return (<p className="signup-error" key={error}>{error}</p>)
                })}
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                  className='login-form-password-input'
                ></input>
                {errors?.password?.map(error => {
                  return (<p className="signup-error" key={error}>{error}</p>)
                })}
              </div>
              <div className='form-group'>
                <label>Repeat Password</label>
                <input
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                  className='login-form-password-input'
                ></input>
                {errors?.password?.map(error => {
                  return (<p className="signup-error" key={error}>{error}</p>)
                })}
              </div>

            </div>
          </form>
        </div>
        <div className='login-form-buttons-container'>
            <button onClick={onSignUp}>Sign Up</button>
         
          
        </div>
        
      </div>
    </div>
  );
};

export default SignUpForm;
