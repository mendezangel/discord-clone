import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { createDM } from '../../store/dms'
import '../auth/LoginForm.css'


const DMForm = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [recipient, setRecipient] = useState("");
  const [errors, setErrors] = useState([]);

  const updateRecipient = (e) => setRecipient(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    let userName = location.state.username
    const dm = {
      name: `${userName.slice(0,userName.indexOf('#'))}>${recipient.slice(0,recipient.indexOf('#'))}`,
      // Channel Name Length may be too short
      server_id: location.state.me_server,
      recipient_name: recipient
    };
    const newDMChannel = await dispatch(createDM(dm));
    console.log('RETURNED ON FORM:', newDMChannel)

    if (newDMChannel.errors) return setErrors(newDMChannel.errors);
    // history.push(`/channels/@me/${newDMChannel.id}`);
  }
  const backButton = () => {
    history.goBack();
  }

  return (
    <div className='whole-page-div'>
      <div className="login-form-container">
        <div className="login-form-text-container">
          <h1>Create a new Direct Message!</h1>
        </div>
        <div className="login-form-input">
          <form
            className="login-form"
            onSubmit={onSubmit}
          >
            <div className='login-form-group'>
              <label>Recipient</label>
              <input
                type="text"
                className="login-form-name-input"
                value={recipient}
                onChange={updateRecipient}
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

export default DMForm;