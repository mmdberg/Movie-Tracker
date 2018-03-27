const moviesReducer = (state = [], action) => {
  switch (action.type) {
  case 'LOAD_CARDS':
    return action.movies;
  default:
    return state;
  }
};

export default moviesReducer;
