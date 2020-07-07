import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import  create from './create.png';
import AddParticipant from './AddParticipant';

class MyRoom extends Component {

  constructor() {
    super();
    this.state = {
      showPopUp: false,
      currentRoom: null
    }
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(roomId) {
    console.log(roomId)
    this.setState({
      showPopup: !this.state.showPopup,
      currentRoom: roomId
    });
  }
  render() {
    const {rooms} = this.props;
    console.log(this.props.rooms.length);
    let contents;
    if(this.props.rooms.length === 0) {
      contents = <img 
      src={create}
      style={{width: '400px', margin: 'auto', display: 'block'}}
      alt="Loading ..."
    />
    } else {
      console.log(rooms);
      contents = <div>
        <h3 className="text-center"> Created Rooms</h3>
        <ol className="room-list">
          {rooms.map((room) => (
            <li key={room.roomId} className="mt-4 p-4 border border-primary rounded">
              <div className="row">
                <div className="col-8">
                  <h4>{room.name}</h4>
                  <p>{room.description}</p>
                </div>
                <div className="col-4">
                  <Link to="/open" className="btn btn-lg btn-info btn-block">
                    OpenRoom
                  </Link>
                  <button onClick={(roomId) => this.togglePopup(room.roomId)} className="btn btn-info btn-block mt-1">Add Participant</button>
                </div>
              </div>
            </li>
          ))}
        </ol>
        {this.state.showPopup ? 
          <AddParticipant
            roomId={this.state.currentRoom}
            closePopup={this.togglePopup}
          />
          : null
        }
      </div>
    }
    return (
      <div>{contents}</div>
    )
  }
}


export default MyRoom;