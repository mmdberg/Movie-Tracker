export const moviesWrangler = movieArray => {
  if (!Array.isArray(movieArray)) {
    return null;
  }
  return movieArray.map(movie => ({
    title: movie.title,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    posterPath: movie.poster_path,
    overview: movie.overview,
    movieId: movie.id
  }));
};

export const favoritesWrangler = movieArray => {
  return movieArray.map(movie => ({
    title: movie.title,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    posterPath: movie.poster_path,
    overview: movie.overview,
    movieId: movie.movie_id,
    favId: movie.id
  }));
};