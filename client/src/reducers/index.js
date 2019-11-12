import { combineReducers } from 'redux';
import editorReducer from './editorReducer';
import postReducer from './postReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  error: errorReducer,
  editor: editorReducer,
  post: postReducer,
  auth: authReducer
});
