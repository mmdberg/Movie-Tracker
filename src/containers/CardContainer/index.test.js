import { shallow } from 'enzyme';
import React from 'react';
import { CardContainer } from './index.js';
import * as mockData from '../../mockData/';
import * as helper from '../../helpers/';

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
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});