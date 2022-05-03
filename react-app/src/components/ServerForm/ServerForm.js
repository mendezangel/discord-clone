import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';
import image from '../../images/login-background.png'
import { createServer } from '../../store/server';

const LoginForm = () => {
    const [image, setImage] = useState();
    const [name, setName] = useState('');

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventdefault();

        const server = {
            image,
            name,
            owner_id: user.id,
            // add server inviteurl
        }

        const newServer = dispatch(createServer(server))
        Redirect
    }

    const updateImage = (e) => {
        setImage(e.target.value);
    };

    const updateName = (e) => {
        setName(e.target.value);
    };

    
    return (
        <div className='whole-page-div'>
            <div className="server-form-container">
                <div className="server-form-text-container">
                    <h1>Customize your server</h1>
                    <p>Give your new server a personality with a name and an icon. You can always change it later.</p>
                </div>
                <div className='server-form-input'>
                    <form className='server-form'>
                        <input
                            type='text'
                            className='server-form-name-input'
                            value={name}
                            onChange={updateName}
                        />
                        <input
                            type='text'
                            className='server-form-image-url'
                            value={image}
                            onChange={updateImage}
                        />
                    </form>
                </div>
                <div className='server-form-buttons-container'>
                    <button className='server-form-back-button'>Back</button>
                    <button className='server-form-create-button' type="submit">Create</button>
                </div>

            </div>
        </div>
    );
};

export default LoginForm;
