import apiKey from '../private/apiKey.js';
import * as helper from '../helpers';

export const getMovies = async () => {
  const root = 'https://api.themoviedb.org/3/';
  const response =
    await fetch(`${root}movie/upcoming?api_key=${apiKey}&language=en-US`);
  const movies = await response.json();
  return helper.moviesWrangler(movies.results);
};

export const addUser = async (user) => {
  try { const response = await fetch('http://localhost:3000/api/users/new/', 
      {
        method: 'POST',
        body: JSON.stringify(user),
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }) } catch(error) {
    console.log(error)
  }
  // const validation = await response.json()
  // console.log(validation)
  // return validation

}