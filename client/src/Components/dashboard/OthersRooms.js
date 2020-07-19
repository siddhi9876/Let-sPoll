import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import  join from './join.png';
import { clearCurrentRoom, getCurrentRoom } from '../../actions/roomActions';

class OthersRooms extends Component {

  constructor() {
    super();
    this.onOpenRoom = this.onOpenRoom.bind(this);
  }

  onOpenRoom(roomId) {
    this.props.clearCurrentRoom();
    this.props.getCurrentRoom(roomId);
  }

  render() {
    const {rooms} = this.props;
    
    let contents;
    if(this.props.rooms.length === 0) {
      contents = <img 
      src={join}
      style={{width: '400px', margin: 'auto', display: 'block'}}
      alt="Loading ..."
    />
    } else {
      
      contents = <div>
        <h3 className="text-center">Rooms you are invited for</h3>
        <ol className="room-list">
          {rooms.map((room) => (
            <li key={room.roomId} className="mt-4 p-4 border border-primary rounded">
              <div className="row">
                <div className="col-8">
                  <h4>{room.name}</h4>
                  <p>{room.description}</p>
                </div>
                <div className="col-4">
                  <Link onClick={(roomId) => this.onOpenRoom(room.roomId)} to="/openRoom" className="btn btn-lg btn-info btn-block">
                    OpenRoom
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    }
    return (
      <div>{contents}</div>
    )
  }
}


export default connect(null, { clearCurrentRoom, getCurrentRoom })(OthersRooms);