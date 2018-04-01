import { mockMovie } from '../MockData';
import favoritesReducer from './favoritesReducer';
import * as actions from '../actions';

describe('Favorites Reducer', () => {
  it('should return the default state', () => {
    expect(favoritesReducer(undefined, {})).toEqual([]);
  });

  it('should add movie to favorites array', () => {
    expect(favoritesReducer(undefined, actions.addFavorite(mockMovie)))
      .toEqual([mockMovie]);
  });

  it('should remove movie from favorites array', () => {
    expect(favoritesReducer([{movieId: 1}], actions.removeFavorite(1)))
      .toEqual([]);
  });
});