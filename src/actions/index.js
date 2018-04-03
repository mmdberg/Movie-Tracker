export const loadCards = movies => ({
  type: 'LOAD_CARDS',
  movies
});

export const addFavorite = movie => ({
  type: 'ADD_FAVORITE',
  movie
});

export const captureUser = user => ({
  type: 'CAPTURE_USER',
  user
});

export const logOutUser = () => ({
  type: 'LOG_OUT_USER'
});

export const changeLogStatus = status => ({
  type: 'CHANGE_LOG_STATUS',
  status
});

export const loadFavorites = favorites => ({
  type: 'LOAD_FAVORITES',
  favorites
});

export const removeFavorite = movieId => ({
  type: 'REMOVE_FAVORITE',
  movieId
});

export const showMovieInfoById = movieId => ({
  type: 'SHOW_MOVIE_INFO_BY_ID',
  movieId
});

export const hideMovieInfo = () => ({
  type: 'HIDE_MOVIE_INFO'
});