import {combineReducers} from 'redux';
import todoReducer from './todo';
import themeReducer from './theme';
import userReducer from './user';

const rootReducer = combineReducers({
  todoReducer,
  userReducer,
  themeReducer,
});

export default rootReducer;
