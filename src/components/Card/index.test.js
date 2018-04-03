import { shallow } from 'enzyme';
import {Card} from './index.js';
import React from 'react';
import * as mockData from '../../mockData';

describe('Card', () => {
  let wrapper;
  const movie = mockData.mockMovie[0];
  const mockHandleFavorite = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <Card 
        displayInfo={''}
        handleInfoDisplay={jest.fn()}
        favBtnClass={''}
        isFavorited={''}
        information={movie} 
        handleFavorite={mockHandleFavorite} 
        logStatus={true}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call addFavorites with the right params on click', () => {
    wrapper.find('button').simulate('click');
    expect(mockHandleFavorite).toHaveBeenCalledWith(movie);
  });
});
