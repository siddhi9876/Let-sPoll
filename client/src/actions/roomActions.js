import axios from 'axios';
import { GET_PROFILE, GET_ERRORS, GET_ROOM, CLEAR_CURRENT_ROOM, ROOM_LOADING } from './types';
import { clearCurrentErrors } from './errorActions';

// GET CURRENT ROOM 
export const getCurrentRoom = (roomId) => dispatch =>  {
  dispatch(setRoomLoading());
  axios.get(`/api/rooms/${roomId}`)
      .then(res => 
        dispatch({
          type: GET_ROOM,
          payload: res.data
        })
      )
      .catch(err => 
        dispatch({
          type: GET_ROOM,
          payload: {}
        })
      )
}


//Create Poll Room
export const createRoom = (roomData, history) => dispatch => {
  axios
    .post('/api/profiles/createRoom', roomData)
    .then(res => {
      alert('Room Created Successfully');
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
     })
}

export const addParticipant = (participant) => dispatch => {
  dispatch(clearCurrentErrors());
  axios.post('/api/profiles/addParticipant', participant)
    .then(res => {
      dispatch({
        type: GET_ROOM,
        payload: res.data
      })

    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

//Profile LOading
export const setRoomLoading = () => {
  return {
    type: ROOM_LOADING
  };
}


//Clear ROOM 
export const clearCurrentRoom = () => (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_ROOM
  })
}