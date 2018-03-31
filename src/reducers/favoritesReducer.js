const favoritesReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_FAVORITE':
    return [...state, action.movie];
  case 'LOAD_FAVORITES':
    return action.favorites;
  default:
    return state;
  }

};

export default favoritesReducer;
