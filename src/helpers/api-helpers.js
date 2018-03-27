import apiKey from '../private/apiKey.js';

export const getMovie = async () => {

  const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`)
  const movie = await response.json()
  return movie.results

}