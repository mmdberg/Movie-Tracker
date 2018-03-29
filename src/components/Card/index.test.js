import { shallow } from 'enzyme';
import {Card} from './index.js';
import React from 'react';
import * as mockData from '../../mockData';

describe('Card', () => {
  const movie = mockData.mockMovie[0];

  it('should match the snapshot', () => {
    const wrapper = shallow(<Card information={movie}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call addFavorites with the right params on click', () => {
    const mockAddFavorite = jest.fn();
    const wrapper = 
      shallow(<Card information={movie} addFavorite={mockAddFavorite}/>);

    wrapper.find('article').simulate('click');

    expect(mockAddFavorite).toHaveBeenCalledWith(movie);

  });
});