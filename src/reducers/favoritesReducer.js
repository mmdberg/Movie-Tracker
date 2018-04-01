const favoritesReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_FAVORITE':
    return [...state, action.movie];
  case "REMOVE_FAVORITE":
    return state.filter(movie => movie.movieId !== action.movieId);
  case 'LOAD_FAVORITES':
    return action.favorites || null;
  default:
    return state;
  }

};

export default favoritesReducer;
