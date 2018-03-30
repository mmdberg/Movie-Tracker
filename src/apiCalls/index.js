import apiKey from '../private/apiKey.js';
import * as helper from '../helpers';

export const getMovies = async () => {
  const root = 'https://api.themoviedb.org/3/';
  const response =
    await fetch(`${root}movie/upcoming?api_key=${apiKey}&language=en-US`);
  const movies = await response.json();
  return helper.moviesWrangler(movies.results);
};

export const addUser = async user => {
  try {
    const response = await fetch('/api/users/new/',
      {
        method: 'POST',
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    const parsed = await response.json();
    return parsed;
  } catch (error) {
    return error;
  }

};

export const signIn = async credentials => {
  const response = await fetch('/api/users/', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const parsedUser = await response.json();
  return parsedUser;
};


export const getUsers = async () => {
  try {
    const response = await fetch('/api/users');
    const users = await response.json();
    return users;
  } catch (error) {
    return error;
  }
};