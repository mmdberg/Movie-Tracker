import * as api from './index.js';
import apiKey from '../private/apiKey';
import * as mockData from '../mockData';
import {moviesWrangler} from '../helpers';

jest.mock('../helpers');

describe('getMovies', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({results: mockData.mockMovies})
    }));
  });

  it('should call fetch with the right parameters', () => {
    api.getMovies();
    /*eslint-disable max-len*/
    const expected = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`;
    /*eslint-enable max-len*/
    expect(window.fetch).toHaveBeenCalledWith(expected);
  });

  it('should call moviesWrangler with the right params', () => {
    api.moviesWrangler = jest.fn();
    api.getMovies();
    expect(moviesWrangler).toHaveBeenCalledWith(mockData.mockMovies);
  });
});

describe('addUser', () => {
  let mockUser;

  beforeEach(() => {
    mockUser = {
      name: 'Stevo',
      email: 'stevo@taco.com',
      password: 'taco'
    };
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok:true,
      json: () => Promise.resolve()
    }));
  });

  it('should call fetch with the correct params', () => {
    const expected = [
      '/api/users/new/',
      {
        method: 'POST',
        body: JSON.stringify(mockUser),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ];

    api.addUser(mockUser);

    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });

  describe('signIn', () => {
    const mockCredentials = {
      email: 'taco@taco.taco',
      password: 'taco'
    };
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok:true,
      json: () => Promise.resolve()
    }));

    it('should call fetch with the correct params', () => {
      const expected = [
        '/api/users/',
        {
          method: 'POST',
          body: JSON.stringify(mockCredentials),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ];
      api.signIn(mockCredentials);
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });
  });

  describe('deleteFavorite', () => {
    const mockUser = {id: 1};
    const mockMovie = {id: 2};
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve()
    }));

    it('should return an error if appropriate', async () => {
      const expected = ['/api/1/favorites/2', {
        method: 'POST',
        body: JSON.stringify({ user: 1, movie: 2 }),
        headers: {
          'Content-Type': 'application/json'
        }
      }];
      api.deleteFavorite(mockMovie, mockUser);
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });
  });

  //get users
  //add favorite

});
