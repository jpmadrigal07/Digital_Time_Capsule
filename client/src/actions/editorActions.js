import axios from 'axios';
import { GET_EDITORS, ADD_EDITOR, DELETE_EDITOR, EDITORS_LOADING, EDIT_EDITOR_STATUS } from './types';
import { returnErrors } from './errorActions';

export const getEditors = () => dispatch => {
  dispatch(setEditorsLoading());
  axios
    .get('/api/users?role=Editor')
    .then(res =>
      dispatch({
        type: GET_EDITORS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addEditor = (editor, history) => dispatch => {
  axios
    .post('/api/users', editor)
    .then(res =>
      dispatch({
        type: ADD_EDITOR,
        payload: res.data
      }),
      history.push('/editors')
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editEditorStatus = (id, status) => dispatch => {
  axios
    .put('/api/users/status/'+id, {status: status, role: 'Editor'})
    .then(res =>
      dispatch({
        type: EDIT_EDITOR_STATUS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteEditor = id => dispatch => {
  axios
    .delete(`/api/users/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_EDITOR,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setEditorsLoading = () => {
  return {
    type: EDITORS_LOADING
  };
};
