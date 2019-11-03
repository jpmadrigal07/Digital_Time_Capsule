import axios from 'axios';
import { returnErrors } from './errorActions';
import { USER_LOADING, USER_LOADED, AUTH_ERROR } from './types';

export const fetchUser = () => dispatch => {
  dispatch({ type: USER_LOADING });
  axios
  .get('/api/current_user')
  .then(res =>
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  )
  .catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR
    });
  });
};