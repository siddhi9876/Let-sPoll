import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


class Poll extends Component {
  render() {
    const { room } = this.props.currentRoom;
    let contents = (
      <div className="container border border-success rounded">
        TODO
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
  currentRoom: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  currentRoom: state.currentRoom
})

export default connect(mapStateToProps)(Poll);
