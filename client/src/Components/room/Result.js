import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


class Result extends Component {
  render() {
    const { room } = this.props.currentRoom;
    let contents = (
      <div className="container border border-success rounded">
        {
          room.males.map((male, index) => (
          <div className="row">
            <div className=" text-center col-sm m-2 p-2 border border-primary rounded">{male}</div>
            <div className=" text-center col-sm m-2 p-2 border border-primary rounded">{room.currentResult[index]}</div>
          </div>
          ))
        }

      </div>
    )
    return (
      <div>
        <div className="alert alert-success" role="alert">
        <h4 className="display-5 text-center">Current Result</h4>
        </div>
      { contents }
      </div>
    )
  }
}

Result.propTypes = {
  currentRoom: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  currentRoom: state.currentRoom
})

export default connect(mapStateToProps)(Result);
