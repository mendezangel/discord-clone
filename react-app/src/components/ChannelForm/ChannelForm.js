import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { createChannel } from '../../store/channels'
import '../auth/LoginForm.css'


const ChannelForm = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  const updateName = (e) => setName(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    const channel = {
      name,
      server_id: location.server_id
    };
    const newChannel = await dispatch(createChannel(channel));

    if (newChannel.errors) return setErrors(newChannel.errors);
    history.push(`/channels/${location.server_id}/${newChannel.id}`);
  }
  const backButton = () => {
    history.goBack();
  }

  return (
    <div className='whole-page-div'>
      <div className="login-form-container">
        <div className="login-form-text-container">
          <h1>Create a new channel.</h1>
        </div>
        <div className="login-form-input">
          <form
            className="login-form"
            onSubmit={onSubmit}
          >
            <div className='login-form-group'>
              <label>Name</label>
              <input
                type="text"
                className="login-form-name-input"
                value={name}
                onChange={updateName}
              />
              { errors?.map( error => {
                return (<p className="login-form-error" key={error}>{error}</p>)
              })}
            </div>

          </form>
        </div>
        <div className='login-form-buttons-container'>
          <button className='server-form-back-button' onClick={backButton}>Back</button>
          <button className='server-form-create-button' onClick={onSubmit} type='submit'>Create</button>
        </div>
      </div>
    </div>
  )
}

export default ChannelForm;
