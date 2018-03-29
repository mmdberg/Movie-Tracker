import moviesReducer from './moviesReducer';
import favoritesReducer from './favoritesReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  movies: moviesReducer,
  favorites: favoritesReducer
});

export default rootReducer;
