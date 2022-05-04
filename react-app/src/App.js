import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Splash from './components/splash-page/Splash';
import Main from './components/main/Main';
import ServerForm from './components/ServerForm/ServerForm';
<<<<<<< HEAD
import ServerEditForm from './components/ServerEditForm/ServerEditForm';
=======
import ChannelForm from './components/ChannelForm/ChannelForm';
>>>>>>> e0e8c8964952af4d6b09180046d9d128523ee21f

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
<<<<<<< HEAD
        <Route path='/channels/:serverId/edit' exact={true}>
          <ServerEditForm />
=======
        <Route path='/channels/new' exact={true}>
          <ChannelForm />
>>>>>>> e0e8c8964952af4d6b09180046d9d128523ee21f
        </Route>
        <ProtectedRoute path='/channels/:server_id'>
          <Main />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
