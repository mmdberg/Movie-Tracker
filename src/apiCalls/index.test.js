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
    }
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok:true, 
      json: () => Promise.resolve()
    }));
  });

  it('should call fetch with the correct params', () => {
    const expected = [
      'localhost:3000/api/users/new', 
      {
        method: 'POST',
        body: JSON.stringify({user: mockUser}),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ];

    api.addUser(mockUser);

    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
});