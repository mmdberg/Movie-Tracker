import apiKey from '../private/apiKey.js';

export const getMovie = async () => {

  const root = 'https://api.themoviedb.org/3/';
  const response = await fetch(`${root}movie/upcoming?api_key=${apiKey}&language=en-US`);
  const movie = await response.json();
  return movie.results;

};


// createObject = (movieArray) => {
//   let cleanObject = movieArray.reduce((array, movie) => {
//     let movieObject = Object.keys(movie)

//   }, [])
//   return cleanObject
// }
