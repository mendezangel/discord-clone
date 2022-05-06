import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { editServer } from '../../store/server';

const ServerEditForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const { state: server } = useLocation();
  const user = useSelector(state => state.session.user);
  // const server = useSelector(state => state.server[serverId])

  const [image, setImage] = useState(server.image);
  const [name, setName] = useState(server.name);
  const [errors, setErrors] = useState([]);


  const updateImage = (e) => {
    setImage(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };


  const onSubmit = async (e) => {
    e.preventDefault();

    const server = {
      id: serverId,
      image,
      name,
      owner_id: user?.id
      //TODO add server inviteurl
    }
    const newServer = await dispatch(editServer(server))
    if (newServer.errors) return setErrors(newServer.errors)
    history.push(`/channels/${newServer.id}`);
  }

  const backButton = () => {
    history.goBack()
  }

  return (
    <div className='whole-page-div'>
      <div className="login-form-container">
        <div className="login-form-text-container">
          <h1>Customize your login</h1>
          <p>Give your new login a personality with a name and an icon. You can always change it later.</p>
        </div>
        <div className='login-form-input'>
          <form
            className='login-form'
            action='/channels/@me/new'
            method='POST'
            onSubmit={onSubmit}
          >
            <div className='login-form-group'>
              <label>Name</label>
              <input
                type='text'
                className='login-form-name-input'
                value={name}
                onChange={updateName}
              />
              {errors?.map(error => {
                return (<p className='login-form-error' key={error}>{error}</p>)
              })}
            </div>
            <div className='login-form-group'>
              <label>Image Url</label>
              <input
                type='text'
                className='login-form-image-url'
                value={image}
                onChange={updateImage}
              />
            </div>
          </form>
        </div>
        <div className='login-form-buttons-container'>
          <button className='server-form-back-button' onClick={backButton}>Back</button>
          <button className='server-form-create-button' onClick={onSubmit} type='submit'>Create</button>
        </div>

      </div>
    </div>
  );
};

export default ServerEditForm;