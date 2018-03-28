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
  describe('ADD_USER', () => {
    it('should return action type of add user', () => {
      const user = {
        name: 'Stevo',
        email: 'stevo@taco.com',
        password: 'taco'
      };
      const expected = {
        type: 'ADD_USER',
        user
      };

      expect(actions.addUser(user)).toEqual(expected);
    });
  });
});
