import {
    GET_EDITORS,
    ADD_EDITOR,
    DELETE_EDITOR,
    EDITORS_LOADING,
    EDIT_EDITOR_STATUS
  } from '../actions/types';
  
  const initialState = {
    editors: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {  
      case GET_EDITORS:
        return {
          ...state,
          editors: action.payload,
          loading: false
        };
      case DELETE_EDITOR:
        return {
          ...state,
          editors: state.editors.filter(editor => editor._id !== action.payload)
        };
      case ADD_EDITOR:
        return {
          ...state,
          editors: [action.payload, ...state.editors]
        };
      case EDIT_EDITOR_STATUS:
          return {
            ...state,
            editors: action.payload
          };
      case EDITORS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  