import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { createChannel } from '../../store/channels'


const ChannelForm = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  const updateName = (e) => setName(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(location.server_id)
    const channel = {
      name,
      server_id: location.server_id
    };
    const newChannel = await dispatch(createChannel(channel));

    if (newChannel.errors) return setErrors(newChannel.errors);
    history.push(`/channels/${location.server_id}`);
  }
  const backButton = () => {
    history.goBack();
  }

  return (
    <div className='whole-page-div'>
      <div className="server-form-container">
        <div className="server-form-text-container">
          <h1>Create a new channel.</h1>
        </div>
        <div className="server-form-input">
          <form
            className="server-form"
            // action="/channels/new"
            // method="POST"
            onSubmit={onSubmit}
          >
            <div className='server-form-group'>
              <label>Name</label>
              <input
                type="text"
                className="server-form-name-input"
                value={name}
                onChange={updateName}
              />
              { errors?.map( error => {
                return (<p className="server-form-error" key={error}>{error}</p>)
              })}
            </div>

          </form>
        </div>
        <div className='server-form-buttons-container'>
          <button className='server-form-back-button' onClick={backButton}>Back</button>
          <button className='server-form-create-button' onClick={onSubmit} type='submit'>Create</button>
        </div>
      </div>
    </div>  
  )
}

export default ChannelForm;