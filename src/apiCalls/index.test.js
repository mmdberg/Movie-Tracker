import * as api from './index.js';
import apiKey from '../private/apiKey';
import * as mockData from '../mockData';
import { favoritesWrangler, moviesWrangler } from '../helpers';

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
  const mockUser = {
    name: 'Stevo',
    email: 'stevo@taco.com',
    password: 'taco'
  };

  it('should call fetch with the correct params', () => {
    window.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
      ok:true,
      json: () => Promise.resolve()
    }));
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

  it('should return error message on error', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
      status: 500
    }));
    const expected = new Error('Unable to add user');

    expect(api.addUser(mockUser)).rejects.toEqual(expected);
  });

});

describe('signIn', () => {
  const mockCredentials = {
    email: 'taco@taco.taco',
    password: 'taco'
  };

  it('should call fetch with the correct params', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok:true,
      json: () => Promise.resolve()
    }));
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

describe('getUserFavorites', () => {
  beforeEach( () => {
    /*eslint-disable id-blacklist*/
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: mockData.mockMovies })
    }));
    /*eslint-enable camelcase*/
  });

  it('should call fetch with the right params', () => {
    api.getUserFavorites(4);
    expect(window.fetch).toHaveBeenCalledWith('/api/users/4/favorites');
  });

  it('should call movies wrangler with the right params', () => {
    api.getUserFavorites();
    expect(favoritesWrangler).toHaveBeenCalledWith(mockData.mockMovies);
  });

  it('should throw an error on error', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
      status: 500
    }));
    const expected = new Error('Unable to get favorites data');
    expect(api.getUserFavorites()).rejects.toEqual(expected);
  });
});

describe('addFavorite', () => {
  const mockUser = {
    email: 'taco@taco',
    name: 'taco',
    id: 2,
    password: 'taco'
  };
  const movieObject = {
  /*eslint-disable camelcase*/
    movie_id: 437670,
    user_id: 2,
    title: "Suck Me Shakespeer 3",
    poster_path: "/cypnifmPJ5JbTjzpZI6MwJdvP7.jpg",
    release_date: "2017-10-26",
    vote_average: 6.2,
    overview: "A comedy that follows an con who lands a position at a"
  };
  /*eslint-enable camelcase*/

  it('should call fetch with the right params', () => {
    const expected = ['/api/users/favorites/new', {
      method: 'POST',
      body: JSON.stringify(movieObject),
      headers: {
        'Content-Type': 'application/json'
      }
    }];
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({})
    }));
    api.addFavorite(mockData.mockMovie[0], mockUser);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });

  it('should return error message on error', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
      status: 500
    }));
    const expected = new Error('Unable to add favorite');
    expect(api.addFavorite(movieObject, mockUser)).rejects.toEqual(expected);
  });
});

describe('removeFavorite', () => {
  const mockUser = { id: 1 };
  const mockMovie = { movieId: 2, title: 'Breakaway' };
 
  it('should call fetch with the right params', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve()
    }));
    const expected = ['/api/users/1/favorites/2', { method: 'DELETE' }];
    api.removeFavorite(mockMovie, mockUser);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
  
  it('should return error message on error', async () => {
    window.fetch = jest.fn().mockImplementationOnce(() => Promise.reject({
      status: 500
    }));
    const expected = new Error('Unable to delete favorite');
    expect(api.removeFavorite(mockMovie, mockUser)).rejects.toEqual(expected);
  });
});