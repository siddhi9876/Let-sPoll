import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER} from './types';

//Register User
export const registerUser = (userData, history) => dispatch => {

  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
};

//Login - Get user token

export const loginUser = (userData) => dispatch => {

  axios.post('/api/users/login', userData)
    .then(res => {
      //Save to local Storage 
      const {token} = res.data;

      //Set token
      localStorage.setItem('jwtToken', token);
      //Set token to Auth header
      setAuthToken(token);
      //Decode user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

//Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

//Log out User

export const logoutUser = () => dispatch => {
  //Remove token from local Storage
  localStorage.removeItem('jwtToken');

  //Remove authorization header fro future requests
  setAuthToken(false);

  //Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
}