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
    const root = 'https://api.themoviedb.org/3/';
    const expected = `${root}movie/upcoming?api_key=${apiKey}&language=en-US`;

    api.getMovies();
    expect(window.fetch).toHaveBeenCalledWith(expected);
  });

  it('should call moviesWrangler with the right params', () => {
    api.moviesWrangler = jest.fn();
    api.getMovies();
    expect(moviesWrangler).toHaveBeenCalledWith(mockData.mockMovies);
  });

  it('should return error message on error', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
      status: 500
    }));
    const expected = new Error('Unable to get movie data');
    expect(api.getMovies()).rejects.toEqual(expected);
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

describe('getUsers', () => {
  it('should call fetch with the right parameters', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok:true,
      json: () => Promise.resolve()
    }));
    api.getUsers();
    expect(window.fetch).toHaveBeenCalledWith('/api/users');
  });
  it('should return error message on error', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
      status: 500
    }));
    const expected = new Error('Unable to get users');
    expect(api.getUsers()).rejects.toEqual(expected);
  });
});


//add favorite

describe('deleteFavorite', () => {
  const mockUser = {id: 1};
  const mockMovie = {id: 2};
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({})
  }));
  //resolve to what validation is
  it.skip('should be called with the right params', () => {
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
  it.skip('should return error message on error', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
      status: 500
    }));
    //resolve to what validation is

    it.skip('should be called with the right params', () => {
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

    it.skip('should return error message on error', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject({
        status: 500
      }));
      const expected = new Error('Unable to delete favorite')
      expect(api.deleteFavorite(mockMovie, mockUser)).rejects.toEqual(expected)
    })
  });
});

