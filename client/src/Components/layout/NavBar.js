import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class NavBar extends Component {

  onLogoutClick(e) {
    e.preventDefault();

    //Todo: Clear Remaining States
    
    this.props.logoutUser();
  }

  render() {
    const {user, isAuthenticated } = this.props.auth;

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    const authlinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <a href="/"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img 
              className="rounded-circle" 
              src={user.avatar}
              alt={user.name}
              title="You must have a Gravatar connected to your gmail"
              style={{width: '25px', marginRight: '5px'}}
            />{' '}
            Logout
          </a>
        </li>
      </ul>
    );



    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Let's Poll
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              {isAuthenticated ? authlinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(NavBar);