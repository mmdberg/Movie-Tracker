import { shallow, mount } from 'enzyme';
import React from 'react';
import { CardContainer, mapDispatchToProps, mapStateToProps } from './index.js';
import * as mockData from '../../mockData/';
import * as helper from '../../helpers/';
import * as actions from '../../actions';
import * as api from '../../apiCalls';

jest.mock('../../apiCalls');

describe('Card Container', () => {
  let wrapper;
  const movies = helper.moviesWrangler(mockData.mockMovies);
  const mockHomeMatch = {path: '/'};
  const mockFavoritesMatch = {path: '/favorites'};
  const mockAddFavorite = jest.fn();
  const mockRemoveFavorite = jest.fn();
  const mockShowMovieInfoById = jest.fn();
  const mockHideMovieInfo = jest.fn();
  const mockUser = {
    name: 'Taco',
    id: 1,
    email: 'taco@taco',
    password: 'taco'
  };

  beforeEach(() => {
    wrapper = shallow(
      <CardContainer 
        displayedMovie={''}
        showMovieInfoById={mockShowMovieInfoById}
        hideMovieInfo={mockHideMovieInfo}
        favorites={[]}
        movies={movies} 
        addFavorite={mockAddFavorite}
        removeFavorite={mockRemoveFavorite}
        logStatus={true}
        match={mockHomeMatch}
        user={mockUser}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match a snapshot for favorites route', () => {
    wrapper = shallow(
      <CardContainer
        displayedMovie={''}
        showMovieInfoById={mockShowMovieInfoById}
        hideMovieInfo={mockHideMovieInfo}
        movies={movies}
        favorites={mockData.mockMovie}
        addFavorite={mockAddFavorite}
        removeFavorite={mockRemoveFavorite}
        logStatus={true}
        match={mockFavoritesMatch}
        user={{}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleFavorite', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <CardContainer
          displayedMovie={''}
          showMovieInfoById={mockShowMovieInfoById}
          hideMovieInfo={mockHideMovieInfo}
          movies={movies}
          favorites={mockData.mockMovie}
          addFavorite={mockAddFavorite}
          removeFavorite={mockRemoveFavorite}
          logStatus={true}
          match={mockHomeMatch}
          user={mockUser}
        />
      );
    });

    it('should remove favorite from database if movie is in favorite', () => {
      wrapper.find('button').simulate('click');
      expect(api.removeFavorite).toHaveBeenCalledWith(movies[0], mockUser);
    });

    it('should remove favorite from store if movie is in favorite', () => {
      wrapper.find('button').simulate('click');
      expect(mockRemoveFavorite).toHaveBeenCalledWith(movies[0]);
    });

    it('should add favorite to db if movie is in favorites', () => {
      wrapper = mount(
        <CardContainer
          displayedMovie={''}
          showMovieInfoById={mockShowMovieInfoById}
          hideMovieInfo={mockHideMovieInfo}
          movies={movies}
          favorites={[]}
          addFavorite={mockAddFavorite}
          removeFavorite={mockRemoveFavorite}
          logStatus={true}
          match={mockHomeMatch}
          user={mockUser}
        />
      );
      wrapper.find('button').simulate('click');
      expect(api.addFavorite).toHaveBeenCalledWith(movies[0], mockUser);
    });

    it('should add favorite to store if movie is in favorites', () => {
      wrapper = mount(
        <CardContainer
          displayedMovie={''}
          showMovieInfoById={mockShowMovieInfoById}
          hideMovieInfo={mockHideMovieInfo}
          movies={movies}
          favorites={[]}
          addFavorite={mockAddFavorite}
          removeFavorite={mockRemoveFavorite}
          logStatus={true}
          match={mockHomeMatch}
          user={mockUser}
        />
      );
      wrapper.find('button').simulate('click');
      expect(mockAddFavorite).toHaveBeenCalledWith(movies[0]);
    });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    it('should call dispatch with right params for addFavorite', () => {
      const mapped = mapDispatchToProps(mockDispatch);
      const mockMovie = mockData.mockMovie;
      
      mapped.addFavorite(mockMovie);

      expect(mockDispatch).toHaveBeenCalledWith(actions.addFavorite(mockMovie));
    });

    it('should call dispatch with right params for removeFavorite', () => {
      const mapped = mapDispatchToProps(mockDispatch);
      const mockMovie = mockData.mockMovie;
      mapped.removeFavorite(mockMovie);
      expect(mockDispatch).toHaveBeenCalledWith(
        actions.removeFavorite(mockMovie.movieId)
      );
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