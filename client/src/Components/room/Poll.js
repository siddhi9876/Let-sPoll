import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

import DropDown from '../common/DropDown';
import { submitResponse } from '../../actions/roomActions'


class Poll extends Component {
  constructor() {
    super();
    this.state = {
      valuesAvailable: [],
      results: [],
      errors: [],
      disabled: []
    }
    this.onChange = this.onChange.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    let tempErrors = [];
    //If any of the Key is not responded
    for(var i = 0 ; i < this.props.currentRoom.room.females.length; i++) {
      if(this.state.results[i] === null) {
        tempErrors[i] = "Please Select a value";
      }
    }

    if(tempErrors.length === 0) {
      let response = {};
      response.currResponse = this.state.results;
      this.props.submitResponse(this.props.currentRoom.room._id, response, this.props.history);
    }
    else {
      this.setState({errors: tempErrors});
    }
  }

  onRefresh() {

    //Clearing the previous responses
    let tempDisabled = [];
    let tempResult = [];
    for(var i = 0 ; i < this.props.currentRoom.room.females.length; i++){
      tempDisabled.push(false);
      tempResult.push(null);
    }
    this.setState({
      valuesAvailable: this.props.currentRoom.room.females,
      results: tempResult,
      errors: [],
      disabled: tempDisabled
    });
  }

  onChange(e){

    //Recording the response and remove the value selected from available values
    let idx = Number(e.target.name);
    let tempState = this.state;
    if(e.target.value !== 0) {
      tempState.disabled[idx] = true;
      tempState.errors[idx] = "";
      tempState.results[idx] = e.target.value;
      tempState.valuesAvailable = this.state.valuesAvailable.filter((value) => value !== e.target.value);
    }
    this.setState(tempState);
  }

  componentDidMount() {
    let tempDisabled = [];
    let tempResult = [];
    for(var i = 0 ; i < this.props.currentRoom.room.females.length; i++){
      tempDisabled.push(false);
      tempResult.push(null);
    }
    this.setState({
        valuesAvailable : this.props.currentRoom.room.females,
        results: tempResult,
        disabled: tempDisabled
    });
  }
  render() {
    const { room } = this.props.currentRoom;
    let contents = (
      <div className="container border border-success rounded">
      <div class="alert alert-primary" role="alert">
        <button type="button" className="btn btn-primary m-2" onClick={this.onRefresh}>Refresh</button>
        <button type="button" className="btn btn-success float-right m-2" onClick={this.onSubmit}>SUBMIT</button>
      </div>
      <hr />
        {
          room.males.map((male, idx) => (
          <div className="row ">
            <div className=" text-center col-sm m-2 p-2 border border-primary rounded">{male}</div>
            <div className=" text-center col-sm m-2 p-0 border border-primary rounded">
              <DropDown name={idx} value={this.state.results[idx]} error={this.state.errors[idx]} options={this.state.valuesAvailable} disabled={this.state.disabled[idx]} onChange={this.onChange} />
            </div>
          </div>
          ))
        }
      </div>
    )
    return (
      <div>
        <div className="alert alert-success" role="alert">
        <h4 className="display-5 text-center">Fill Your Response</h4>
        </div>
      { contents }
      </div>
    )
  }
}

Poll.propTypes = {
  currentRoom: PropTypes.object.isRequired,
  submitResponse: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentRoom: state.currentRoom
})

export default connect(mapStateToProps, {submitResponse})(withRouter(Poll));
