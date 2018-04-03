import moviesReducer from './moviesReducer';
import favoritesReducer from './favoritesReducer';
import userReducer from './userReducer';
import logReducer from './logReducer';
import displayedMovieReducer from './displayedMovieReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  movies: moviesReducer,
  favorites: favoritesReducer,
  user: userReducer,
  logStatus: logReducer,
  displayedMovie: displayedMovieReducer
});

export default rootReducer;
