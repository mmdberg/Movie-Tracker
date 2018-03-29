export const loadCards = (movies) => ({
  type: 'LOAD_CARDS',
  movies
});

export const addFavorite = (movie) => ({
  type: 'ADD_FAVORITE',
  movie
});

export const captureUserId = (id) => ({
  type: 'CAPTURE_USER_ID',
  id
});
