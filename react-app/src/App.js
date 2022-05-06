import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Splash from './components/splash-page/Splash';
import Main from './components/main/Main';
import ServerForm from './components/ServerForm/ServerForm';
import ServerEditForm from './components/ServerEditForm/ServerEditForm';
import ChannelForm from './components/ChannelForm/ChannelForm';
import ServerJoin from './components/ServerJoin/ServerJoin';
import ChannelEditForm from './components/ChannelEditForm/ChannelEditForm';
import DMForm from './components/DmForm/DMForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <NavBar />
          <Splash />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/servers/new' exact={true}>
          <ServerForm />
        </Route>
        <Route path='/channels/:serverId/edit' exact={true}>
          <ServerEditForm />
        </Route>
        <Route path='/channels/new' exact={true}>
          <ChannelForm />
        </Route>
        <Route path='/channels/:server_id(\d{0,4})/:id(\d{0,4})/editchannel' exact={true}>
          <ChannelEditForm />
        </Route>
        <ProtectedRoute path='/channels/:me(@me)'>
          <Main style={{ overflow: "hidden" }} />
        </ProtectedRoute>
        <ProtectedRoute path='/channels/:server_id(\d{0,4})/:channel_id(\d{0,4})' exact={true}>
          <Main style={{ overflow: "hidden" }} />
        </ProtectedRoute>
        <Route path='/dms/new' exact={true}>
          <DMForm />
        </Route>
        <Route path='/gg/:serverId' exact={true}>
          <ServerJoin />
        </Route>
        <Route>
          <Redirect to='/' />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
