export const loadCards = (movies) => ({
  type: 'LOAD_CARDS',
  movies
});

export const addFavorite = (movie) => ({
  type: 'ADD_FAVORITE',
  movie
})
