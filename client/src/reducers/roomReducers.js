import { GET_ROOM, ROOM_LOADING, CLEAR_CURRENT_ROOM } from '../actions/types';

const initialState = {
  room: null,
  loading: false
}

export default function(state = initialState, action) {

  switch(action.type) {
    case ROOM_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_ROOM:
      return {
        ...state,
        room: action.payload,
        loading: false
      }
    case CLEAR_CURRENT_ROOM: 
      return {
        ...state,
        room: null,
        loading: false
      }
    default: 
      return state;
  }
}