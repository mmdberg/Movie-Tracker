import * as actions from '../actions';
import displayedMovieReducer from './displayedMovieReducer';

describe('displayedMovieReducer', () => {
  it('should return a default state', () => {
    expect(displayedMovieReducer(undefined, {})).toEqual(null);
  });

  it('should add movieIds to its array', () => {
    expect(displayedMovieReducer(undefined, actions.showMovieInfoById(1)))
      .toEqual(1);
  });

  it('should remove movieIds from its array', () => {
    expect(displayedMovieReducer(1, actions.hideMovieInfo())).toEqual(null);
  }); 
});