import * as actions from './index';
import * as mockData from '../mockData';

describe('Actions', () => {
  describe('LOAD_CARDS', () => {
    it('should return action type of load cards', () => {
      const movies = mockData.mockMovies;
      const expected = {
        type: 'LOAD_CARDS',
        movies
      };
      expect(actions.loadCards(movies)).toEqual(expected);
    });
  });

  describe('ADD_FAVORITE', () => {
    it('should return action type of add favorite', () => {
      const movie = mockData.mockMovie;
      const expected = {
        type: 'ADD_FAVORITE',
        movie
      }
      expect(actions.addFavorite(movie)).toEqual(expected)
    })
  })


});
