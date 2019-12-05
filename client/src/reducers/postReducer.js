
import {
    GET_POSTS,
    ADD_POST,
    EDIT_POST_STATUS,
    DELETE_POST,
    POSTS_LOADING
  } from '../actions/types';
  
  const initialState = {
    posts: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {  
      case GET_POSTS:
        return {
          ...state,
          posts: action.payload,
          loading: false
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== action.payload)
        };
      case ADD_POST:
        return {
          ...state,
          posts: [...state.posts, action.payload],
          loading: false
        };
      case EDIT_POST_STATUS:
          return {
            ...state,
            posts: action.payload
          };
      case POSTS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  