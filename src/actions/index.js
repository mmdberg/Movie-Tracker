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
