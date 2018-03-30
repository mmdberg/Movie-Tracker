import { shallow } from 'enzyme';
import React from 'react';
import { Favorites } from './index';
import * as mockData from '../../mockData';

describe('Favorites', () => {
  const mockAddFavorite = jest.fn();

  it('should match the snapshot', () => {
    const wrapper = shallow(
      <Favorites 
        favorites={mockData.mockMovie} 
        addFavorite={mockAddFavorite}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

});