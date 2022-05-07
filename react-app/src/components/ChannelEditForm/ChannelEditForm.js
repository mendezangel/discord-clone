import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { createChannel } from '../../store/channels'
import '../ChannelForm/ChannelForm.css'


const ChannelEditForm = () => {
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

    if (newChannel.errors) return setErrors(newChannel.errors.name);
    history.push(`/channels/${location.server_id}/${newChannel.id}`);
  }
  const backButton = () => {
    history.goBack();
  }

  return (
    <div className='whole-page-div'>
      <div className="signup-form-container">
        <div className="login-form-text-container">
          <h1> Edit Channel</h1>
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
                className="input"
                name='name'
                value={name}
                onChange={updateName}
              />
              {errors?.map(error => {
                return (<p className="signup-error" key={error}>{error}</p>)
              })}
            </div>

          </form>
        </div>
        <div className='create-channel-buttons-container'>
          <button className='channel-form-button' onClick={backButton}>Back</button>
          <button className='channel-form-button' onClick={onSubmit} type='submit'>Create</button>
        </div>
      </div>
    </div>
  )
}
export default ChannelEditForm;
