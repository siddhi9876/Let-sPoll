import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import NavBar from './Components/layout/NavBar.js';
import Landing from './Components/layout/Landing.js';
import Footer from './Components/layout/Footer.js';
import Register from './Components/auth/Register.js';


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
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
    )
  }
}

export default App;