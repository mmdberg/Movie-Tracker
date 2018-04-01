import apiKey from '../private/apiKey.js';
import * as helper from '../helpers';

export const getMovies = async () => {
  try {
    const root = 'https://api.themoviedb.org/3/';
    const response =
      await fetch(`${root}movie/upcoming?api_key=${apiKey}&language=en-US`);
    const movies = await response.json();
    return helper.moviesWrangler(movies.results);
  } catch (error) {
    throw new Error('Unable to get movie data');
  }
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
    throw new Error('Unable to add user');
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
    throw new Error('Unable to get users');
  }
};

export const getUserFavorites = async (id) => {
  try {
    const response = await fetch(`/api/users/${id}/favorites`);
    const parsedResponse = await response.json();
    const wrangler = helper.favoritesWrangler(parsedResponse.data);
    return wrangler;
  } catch (error) {
    throw new Error('Unable to get favorites data');
  }
};

export const addFavorite = async (movie, user) => {
  /*eslint-disable camelcase*/
  const movieObject = {
    movie_id: movie.movieId,
    user_id: user.id,
    title: movie.title,
    poster_path: movie.posterPath,
    release_date: movie.releaseDate,
    vote_average: movie.voteAverage,
    overview: movie.overview
  };
  /*eslint-enable camelcase*/
  try {
    const response = await fetch('/api/users/favorites/new', {
      method: 'POST',
      body: JSON.stringify(movieObject),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const favoriteResponse = await response.json();
    return favoriteResponse;
  } catch (error) {
    throw new Error('Unable to add favorite');
  }
};

export const removeFavorite = (movie, user) => {
  try {
    fetch(
      `/api/users/${user.id}/favorites/${movie.movieId}`, 
      { method: 'DELETE'}
    );
  } catch (error) {
    throw new Error('Unable to delete favorite ', movie.title);
  }
};
