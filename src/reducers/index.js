import moviesReducer from './moviesReducer';
import favoritesReducer from './favoritesReducer';
import userReducer from './userReducer';
import logReducer from './logReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  movies: moviesReducer,
  favorites: favoritesReducer,
  user: userReducer,
  logStatus: logReducer
});

export default rootReducer;
