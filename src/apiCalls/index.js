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
    console.log('add user error', error);
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
    console.log('get users error:', error);
  }
};

export const addFavorite = async (movie, user) => {
  const movieObject = { 
    movie_id: movie.id,
    user_id: user.id,
    title: movie.title,
    poster_path: movie.posterPath,
    release_date: movie.releaseDate,
    vote_average: movie.voteAverage,
    overview: movie.overview
  };
  try { 
    const response = await fetch('/api/users/favorites/new', {
      method: 'POST',
      body: JSON.stringify(movieObject),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('response', response);
    const favoriteResponse = await response.json();
    console.log('favoriteResponse', favoriteResponse);
    return favoriteResponse;
  } catch (error) {
    console.log('add favorite error:', error);
  }
};

export const deleteFavorite = async (movie, user) => {
  try {
    const response = await fetch(`/api/${user.id}/favorites/${movie.id}`, {
      method: 'POST',
      body: JSON.stringify({user: user.id, movie: movie.id}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const validation = response.json();
    return validation;
  } catch (error) {
    return error;
  }
};