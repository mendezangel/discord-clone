import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { editChannel } from '../../store/channels'


const ChannelEditForm = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  const updateName = (e) => setName(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(location.state)
    const channel = {
      id: location.state.id,
      name,
      server_id: location.state.server_id
    };
    console.log(channel)
    const editedChannel = await dispatch(editChannel(channel));
    if (editedChannel.errors) return setErrors(editedChannel.errors);
    history.push(`/channels/${location.state.server_id}/${editedChannel.id}`);
  }
  const backButton = () => {
    history.goBack();
  }

  return (
    <div className='whole-page-div'>
      <div className="login-form-container">
        <div className="login-form-text-container">
          <h1>Edit channel name.</h1>
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

export default ChannelEditForm;
