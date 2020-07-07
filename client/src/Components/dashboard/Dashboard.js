import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile} from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import MyRoom from './MyRoom';
import OthersRooms from './OthersRooms.js';


class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if(profile === null || loading ) {
      dashboardContent = <Spinner />
    } else {
      //Check if user is logged in and has profile created
      if(Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            
            <Link to="/create-room" className="btn btn-lg btn-info ">
            <span className="glyphicon glyphicon-plus-sign">Create Room</span> 
            </Link>
            <hr />
            <div className="row">
              <div className="col-sm">
              <MyRoom rooms={profile.room_created}/>
              </div>
              <div className="col-sm">
              <OthersRooms  rooms={profile.room_partOf}/>
              </div>
            </div>
          </div>
        )
      } else {
        //User has no profile data
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile"
              className="btn btn-lg btn-info">
                Create Profile
              </Link>
          </div>
        )
      }
    }
    return (
      <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center display-4">
              Welcome {user.name}
            </h1>
            {dashboardContent}
          </div>
        </div>
      </div>
        
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})


export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);