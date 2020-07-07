import React, { Component } from 'react';
import  create from './join.png';

class OthersRoom extends Component {

  render() {
    const {rooms} = this.props;
    let contents;
    if(this.props.rooms.length === 0) {
      contents = <img 
      src={create}
      style={{width: '400px', margin: 'auto', display: 'block'}}
      alt="Loading ..."
    />
    } else {
      contents = <div>
        <h3 className="text-center"> Rooms You Invited for</h3>
        <ol className="room-list">
          {rooms.map((room) => (
            <li key={room.roomId} className="mt-4 p-4 border border-primary rounded">
              <div className="row">
                <div className="col-8">
                  <h4>{room.name}</h4>
                  <p>{room.description}</p>
                </div>
                <div className="col-4">
                  <button className="btn btn-info btn-block"> Open</button>
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


export default OthersRoom;