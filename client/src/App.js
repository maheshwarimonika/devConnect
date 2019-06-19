import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { loadUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';

import './App.css';

//Check for jwtToken
if(localStorage.token){
  //Set auth token header auth
  setAuthToken(localStorage.token)
  //Check token expired

}

const App = () => {

    //useEffect(() => {
      //store.dispatch(loadUser())
    //},[]);

    return (
      <Provider store={ store }>
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path="/" component= { Landing } />
            <section className="container">
              <Alert />
              <Route exact path="/register" component= { Register } />
              <Route exact path="/login" component= { Login } />
              <Switch>
                <PrivateRoute exact path="/dashboard" component= { Dashboard } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component= { CreateProfile } />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </Provider>
    );
}

export default App;
