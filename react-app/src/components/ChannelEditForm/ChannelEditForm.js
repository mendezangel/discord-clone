import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { editChannel } from '../../store/channels'
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
      id: window.location.pathname.split('/')[3],
      name,
      server_id: location.state.server_id
    };
    const updatedChannel = await dispatch(editChannel(channel));
    console.log('updatedChannel:', updatedChannel)

    if (updatedChannel.errors) return setErrors(updatedChannel.errors.name);
    history.push(`/channels/${updatedChannel.server_id}/${updatedChannel.id}`);
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
                required
              />
              {errors?.map(error => {
                return (<p className="signup-error" key={error}>{error}</p>)
              })}
            </div>

          </form>
        </div>
        <div className='create-channel-buttons-container'>
          <button className='channel-form-button' onClick={backButton}>Back</button>
          <button className='channel-form-button' onClick={onSubmit} type='submit'>Edit</button>
        </div>
      </div>
    </div>
  )
}
export default ChannelEditForm;
