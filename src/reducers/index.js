import moviesReducer from './moviesReducer';
import favoritesReducer from './favoritesReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  movies: moviesReducer,
  favorites: favoritesReducer,
  user: userReducer
});

export default rootReducer;
