import * as helpers from './index';
import * as mockData from '../mockData';

describe('moviesWrangler', () => {
  it('should return an array of objects containing movie data', () => {
    const expected = [{
      title: "Suck Me Shakespeer 3",
      releaseDate: "2017-10-26",
      overview: "A comedy that follows an con who lands a position at a",
      posterPath: "/cypnifmPJ5JbTjzpZI6MwJdvP7.jpg",
      voteAverage: 6.2,
      id: 437670
    }];
    const wrangledData = helpers.moviesWrangler(mockData.mockMovies);
    expect(wrangledData).toEqual(expected);
  });

  it('should return null if an array is not received', () => {
    expect(helpers.moviesWrangler({})).toEqual(null);
  });
});