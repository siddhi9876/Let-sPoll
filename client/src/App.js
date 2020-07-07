import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';


import './App.css';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions'


import PrivateRoute from './Components/common/PrivateRoute'
import NavBar from './Components/layout/NavBar.js';
import Landing from './Components/layout/Landing.js';
import Footer from './Components/layout/Footer.js';
import Register from './Components/auth/Register.js';
import Login from './Components/auth/Login.js';
import Dashboard from './Components/dashboard/Dashboard'
import CreateProfile from './Components/create-profile/CreateProfile';
import CreateRoom from './Components/create-room/CreateRoom';
import CurrentRoom from './Components/room/CurrentRoom';




if(localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    //Todo: Clear remaining states

    //Redirect to login
    window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-room" component={CreateRoom} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/openRoom" component={CurrentRoom} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
    )
  }
}

export default App;