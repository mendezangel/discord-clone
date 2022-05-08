import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };
  return <i class="fas fa-right-from-bracket" onClick={onLogout}></i>;
};

export default LogoutButton;
