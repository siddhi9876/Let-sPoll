import { combineReducers } from 'redux';
import authReducer from './authReducers'
import errorReducer from './errorReducers'
import profileReducers from './profileReducers';
import roomReducers from './roomReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducers,
  currentRoom: roomReducers
});