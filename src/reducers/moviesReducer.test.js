import moviesReducer from './moviesReducer';
import * as actions from '../actions';
import mockMovies from '../mockData';

describe('moviesReducer', () => {
  it('should return the default state', () => {
    expect(moviesReducer(undefined, {})).toEqual([]);
  });
  
  it('should add an array of movies to the state', () => {
    expect(moviesReducer(undefined, actions.loadCards(mockMovies)))
      .toEqual(mockMovies);
  });
});
