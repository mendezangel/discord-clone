import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./ServerForm.css"
import { createServer } from '../../store/server';

const ServerForm = () => {
  const history = useHistory();
  const [image, setImage] = useState("");
  const [name, setName] = useState('');
  const [errors, setErrors] = useState([])

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const updateImage = (e) => {
    setImage(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };


  const onSubmit = async (e) => {
    e.preventDefault();

    const server = {
      image,
      name,
      owner_id: user?.id,
      url: `${window.location.origin}`
    }

    const newServer = await dispatch(createServer(server))
    if (newServer.errors) return setErrors(newServer.errors)
    history.push(`/channels/${newServer.id}`);
  }

  const backButton = () => {
    history.goBack()
  }

  return (
    <div className='whole-page-div'>
      <div className="server-form-container">
        <div className="server-form-text-container">
          <h1>Customize your server</h1>
          <p>Give your new server a personality with a name and an icon. You can always change it later.</p>
        </div>
        <div className='server-form-input'>
          <form
            className='server-form'
            action='/channels/@me/new'
            method='POST'
            onSubmit={onSubmit}
          >
            <div className='server-form-group'>
              <label>Name</label>
              <input
                type='text'
                className='server-form-name-input'
                value={name}
                onChange={updateName}
              />
              {errors?.map(error => {
                return (<p className='server-form-error' key={error}>{error}</p>)
              })}
            </div>
            <div className='server-form-group'>
              <label>Image Url</label>
              <input
                type='text'
                className='server-form-image-url'
                value={image}
                onChange={updateImage}
              />
            </div>
          </form>
        </div>
        <div className='server-form-buttons-container'>
          <button className='server-form-back-button' onClick={backButton}>Back</button>
          <button className='server-form-create-button' onClick={onSubmit} type='submit'>Create</button>
        </div>

      </div>
    </div>
  );
};

export default ServerForm;
