import { CLEAR_CURRENT_ERRORS }from './types';

export const clearCurrentErrors = () => (dispatch) => {
  dispatch(clearErrors());
}

//Clear Profile 
export const clearErrors = () => {
  return {
    type: CLEAR_CURRENT_ERRORS
  };
}