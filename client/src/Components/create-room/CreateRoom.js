import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import TextField from '../common/TextField';
import TextAreaField from '../common/TextAreaField'
import { createRoom } from '../../actions/roomActions';

class CreateRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      males: null,
      females: null,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onSubmit (e) {
    e.preventDefault();
    let males = (this.state.males === null) ? [] :this.state.males.split(',');
    let females = (this.state.females === null) ? [] : this.state.females.split(',');
    const roomData = {
      name: this.state.name,
      description: this.state.description,
      males,
      females
    }

    this.props.createRoom(roomData, this.props.history);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  render() {

    const {errors} = this.state;
    return (
      <div className="create-room">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Create Your Room
              </h1>
              <p className="lead tex-center">
                Let's create your own poll room
              </p>
              <small className="d-block p-b3">* = Required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextField
                  placeholder="* Room Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.roomName}
                  info="A Unique Room name for your poll room"
                />
                <TextAreaField
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.roomDescription}
                  info="Describe your Room"
                />

                <TextField
                  placeholder="Keys in comma seperated form"
                  name="males"
                  value={this.state.males}
                  onChange={this.onChange}
                  error={errors.roomMales}
                />

                <TextField
                  placeholder="Values in Comma Separated form"
                  name="females"
                  value={this.state.females}
                  onChange={this.onChange}
                  error={errors.roomFemales}
                />

                <input 
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateRoom.propTypes = {
  room: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  room: state.room,
  errors: state.errors
})

export default connect(mapStateToProps, {createRoom})(withRouter(CreateRoom));
