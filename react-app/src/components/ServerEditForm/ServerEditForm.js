import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { editServer } from '../../store/server';
import './ServerEditForm.css'

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
    if (newServer.errors) {
      return setErrors(newServer.errors)
    }
    history.push(`/channels/${newServer.id}`);
  }

  const backButton = () => {
    history.goBack()
  }

  return (
    <div className='whole-page-div'>
      <div className="edit-server-form-container">
        <div className="edit-server-text-container">
          <h1>Customize your Server</h1>
        </div>
        <div className='edit-server-form-form-container'>
          <form
            className='edit-server-form'
            action='/channels/@me/new'
            method='POST'
            onSubmit={onSubmit}
          >
            <div className='edit-server-form-group'>
              <label>Name</label>
              <input
                type='text'
                className='edit-server-form-input'
                name='name'
                value={name}
                onChange={updateName}
              />
              {errors?.map(obj => {
                return (<p className='server-form-error' key={obj.name}>{obj.name}</p>)
              })}
            </div>
            <div className='edit-server-form-group'>
              <label>Image Url</label>
              <input
                type='text'
                className='edit-server-form-input'
                name='image'
                value={image}
                onChange={updateImage}
              />
              {errors?.map(obj => {
                return (<p className='server-form-error' key={obj.image}>{obj.image}</p>)
              })}
            </div>
          </form>
        </div>
        <div className='edit-server-form-buttons-container'>
          <button className='edit-server-form-back-button' onClick={backButton}>Back</button>
          <button className='edit-server-form-create-button' onClick={onSubmit} type='submit'>Create</button>
        </div>

      </div>
    </div>
  );
};

export default ServerEditForm;