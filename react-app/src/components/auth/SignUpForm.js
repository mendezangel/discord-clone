import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import './LoginForm.css';
import image from '../../images/login-background.png'
import './SignUpForm.css'

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
    const data = await dispatch(signUp(username, email, password, repeatPassword));
    if (data) {
      setErrors(data)
      console.log(data)
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
      <div className='signup-form-container'>
        <div className='login-form-text-container'>
          <h1>Create an account.</h1>
        </div>
        <div className='signup-form-form-container'>
          <form onSubmit={onSignUp} className='login-form'>
            {/* <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div> */}
            <div className='signup-form-input-fields'>
              <div className='form-group'>
                <label>User Name</label>
                <input
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                  className='signup-form-input'
                />
                {errors?.username?.map(error => {
                  return (<p className="signup-error" key={error}>{error}</p>)
                })}
              </div>
              <div className='form-group'>
                <label>Email</label>
                <input
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                  className='signup-form-input'
                ></input>
                {errors?.email?.map(error => {
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
        <div className='signup-form-buttons-container'>
          <button onClick={onSignUp}>Sign Up</button>
        </div>
        <div className='signup-form-no-account-container'>
          <p className='signup-form-login-p'>Already have an account? <span><Link to='/login' className='signup-form-login-link'> Login</Link></span></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
