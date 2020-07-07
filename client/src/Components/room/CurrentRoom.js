import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


import isEmpty from '../../validation/is-empty';
import Spinner from '../common/Spinner';
import Poll from './Poll.js';
import Result from './Result.js';


class CurrentRoom extends Component {
  constructor() {
    super();
    this.state = {
      optionsLeft: null
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {

  }
  render() {
    let contents;
    if(this.props.currentRoom.loading || isEmpty(this.props.currentRoom.room)) {
      contents = <Spinner />
    } else {
      let room = this.props.currentRoom.room;
      contents = (
        <div>
        <div className="jumbotron">
          <h1 className="text-center display-4"> Welcome To Poll Room <hr/>{room.name}</h1>
          <hr className="my-4" />
          <p className="lead text-center text-info">{room.description}</p>
          <br />
          <h3>Owner <h4>{room.owner} </h4></h3>
        </div>
        <div className="row">
          <div className="col-sm">
            <Poll />
          </div>
          <div className="col-sm">
            <Result />
          </div>
        </div>
        </div>
      )
      
    }
    return (
      <div className="currentRoom">
      <div className="container">
      <div className="row">
          <div className="col-md-12">
            {contents}
          </div> 
      </div>
      </div>
      </div>
    )
  }
}
CurrentRoom.propTypes = {
  currentRoom: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  currentRoom: state.currentRoom
})

export default connect(mapStateToProps)(CurrentRoom);
