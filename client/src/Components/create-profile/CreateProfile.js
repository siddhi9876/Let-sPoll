import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '../common/TextField'

import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {

  constructor() {
    super();
    this.state = {
      handle: '',
      company: '',
      errors: {}
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const newProfile = {
      company: this.state.company,
      handle: this.state.handle
    }
    
    this.props.createProfile(newProfile, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
      <div className="container">
        <div className="row">
         <div className="col-md-8 m-auto">
           <h1 className="display-4 text-center">
             Create Your Profile
           </h1>
           <p className="lead text-center">
             Let us know more about you
           </p>
           <form onSubmit={this.onSubmit}>
            <TextField
              placeholder="UserHandle"
              name="handle"
              value={this.state.handle}
              onChange={this.onChange}
              error={errors.handle}
            />

            <TextField
              placeholder="Company Name"
              name="company"
              value={this.state.company}
              onChange={this.onChange}
              error={errors.company}
            />

            <input type="submit" value="submit" className
            ="btn btn-info btn-block mt-4" />
           </form>
         </div> 
        </div>
      </div>
        
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, {createProfile}) (withRouter(CreateProfile));