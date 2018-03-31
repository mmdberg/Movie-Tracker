import { shallow } from 'enzyme';
import React from 'react';
import { CardContainer, mapDispatchToProps, mapStateToProps } from './index.js';
import * as mockData from '../../mockData/';
import * as helper from '../../helpers/';
import * as actions from '../../actions';

describe('Card Container', () => {
  let wrapper;
  const movies = helper.moviesWrangler(mockData.mockMovies);
  const mockHomeMatch = {path: '/'};
  const mockFavoritesMatch = {path: '/favorites'};
  const mockAddFavorite = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <CardContainer 
        favorites={[]}
        movies={movies} 
        addFavorite={mockAddFavorite}
        logStatus={true}
        match={mockHomeMatch}
        user={{}}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match a snapshot for favorites route', () => {
    wrapper = shallow(
      <CardContainer
        movies={movies}
        favorites={mockData.mockMovie}
        addFavorite={mockAddFavorite}
        logStatus={true}
        match={mockFavoritesMatch}
        user={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    it('should call dispatch with right params for addFavorite', () => {
      const mapped = mapDispatchToProps(mockDispatch);
      const mockMovie = mockData.mockMovie;
      
      mapped.addFavorite(mockMovie);

      expect(mockDispatch).toHaveBeenCalledWith(actions.addFavorite(mockMovie));
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with values from state', () => {
      const mockState = {
        movies: [],
        logStatus: false,
        user: {},
        favorites: []
      };

      const result = mapStateToProps(mockState);
      expect(result).toEqual(mockState);
    });
  });
});