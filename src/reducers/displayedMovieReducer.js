const displayedMovieReducer = (state = '', action) => {
  switch (action.type) {
  case 'SHOW_MOVIE_INFO_BY_ID':
    return action.movieId;
  case 'HIDE_MOVIE_INFO':
    return '';
  default:
    return state;
  }
};

export default displayedMovieReducer;