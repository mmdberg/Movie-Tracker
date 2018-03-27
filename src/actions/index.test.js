import * as actions from './index';

describe('Actions', () => {
  describe('LOAD_CARDS', () => {
    it('should return action type of load cards', () => {
      const movies = [{
        "vote_count": 56,
        "id": 437670,
        "video": false,
        "vote_average": 6.2,
        "title": "Suck Me Shakespeer 3",
        "popularity": 28.024527,
        "poster_path": "/cypnifmPJ5JbTjzpZI6MwJdvP7.jpg",
        "original_language": "de",
        "original_title": "Fack ju Göhte 3",
        "genre_ids": [35],
        "backdrop_path": "/a3Ipy3B4APTPx1ISkls95XSs5fU.jpg",
        "adult": false,
        "overview": "A comedy that follows an con who lands a position at a school.",
        "release_date": "2017-10-26"
      }]
      const expected = {
        type: 'LOAD_CARDS',
        movies
      }
      expect(actions.loadCards).toEqual(expected)



    })
  })



})