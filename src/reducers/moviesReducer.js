const moviesReducer = (state = [], actions) => {
  switch (actions.type) {
  case 'LOAD_CARDS':
    return actions.movies;
  default:
    return state;
  }
};

export default moviesReducer;
