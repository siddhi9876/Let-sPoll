import axios from 'axios';
import { GET_ERRORS, GET_PROFILE, PROFILE_LOADING } from './types';

//GET Profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profiles')
    .then(res => 
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
  )
}

//Create Profile
export const createProfile = (profileData, history) => (dispatch) => {

  axios.post('/api/profiles', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}


//Action Creator for PROFILE_LOADING

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
}