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
      };

      expect(actions.addFavorite(movie)).toEqual(expected);
    });
  });

  describe('CAPTURE_USER', () => {
    it('should return action type of capture user', () => {
      const user = {name: "Bill", email: "Bill@gmail.com", id: 5};
      const expected = {
        type: 'CAPTURE_USER',
        user
      };
      
      expect(actions.captureUser(user)).toEqual(expected);
    });
  });

  describe('LOG_OUT_USER', () => {
    it('should return action type log out user', () => {
      const expected = {type: "LOG_OUT_USER"};
      expect(actions.logOutUser()).toEqual(expected);
    });
  });

});
