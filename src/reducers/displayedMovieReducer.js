const displayedMovieReducer = (state = null, action) => {
  switch (action.type) {
  case 'SHOW_MOVIE_INFO_BY_ID':
    return action.movieId;
  case 'HIDE_MOVIE_INFO':
    return null;
  default:
    return state;
  }
};

export default displayedMovieReducer;