import axios from 'axios';
import { GET_POSTS, ADD_POST, EDIT_POST_STATUS, DELETE_POST, POSTS_LOADING } from './types';
import { returnErrors } from './errorActions';

export const getPosts = (status) => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get('/api/posts?status='+status)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addPost = (post, history) => dispatch => {
  axios
    .post('/api/posts', post)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      }),
      history.push('/my-posts')
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editPostStatus = (id, status) => dispatch => {
  axios
    .put('/api/posts/status/'+id, {status: status})
    .then(res =>
      dispatch({
        type: EDIT_POST_STATUS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};
