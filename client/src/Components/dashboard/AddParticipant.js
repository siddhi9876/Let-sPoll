import React, {Component} from 'react'
import { connect } from 'react-redux';
import TextField from '../common/TextField';
import isEmpty from '../../validation/is-empty';
import { addParticipant} from '../../actions/roomActions';
import { clearCurrentErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';




class AddParticipant extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      roomId: '',
      success: false,
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit() {
    const participantData= {};
    participantData.room = {
      id: this.props.roomId
    }
    this.props.clearCurrentErrors();
    participantData.participant = this.state.email;
    this.props.addParticipant(participantData);
  }

  componentWillReceiveProps(nextProps) {

    if(!isEmpty(nextProps.currentRoom.room) && nextProps.currentRoom.room
    .participants.filter((participant) => participant.email === this.state.email).length > 0 ) {
      this.setState({success: true});
    }

    if(!isEmpty(nextProps.errors)) {
      this.setState({errors: nextProps.errors, success: false});
    }
    
  }
  render() {
    const { errors } = this.state;
    return (
      <div className='popup'>
        <div className='popup_inner mt-4 p-4 border border-success rounded'>
        <h1 className="display-6 text-center" > Add Participant to Room</h1>
          <TextField
            placeholder="Email of Partcipant"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.addParticipant}
            info="Enter the Email Id of Participant"
          />
        {this.state.success && <div className="alert alert-success p-0" role="alert"> Participant Added Succesfully
        </div> }
        <button className="btn btn-info  mt-4" onClick={this.props.closePopup}>Close</button>
        <button style={{right: 0, bottom: 0}} className="btn btn-info float-right mt-8" onClick={this.onSubmit}>Add Participant</button>
        </div>
      </div>
    );
  }
}

AddParticipant.propTypes = {
  currentRoom: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addParticipant: PropTypes.func.isRequired,
  clearCurrentErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentRoom: state.currentRoom,
  errors: state.errors
})


export default connect(mapStateToProps, { addParticipant, clearCurrentErrors })(AddParticipant);