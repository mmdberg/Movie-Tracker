import { shallow } from 'enzyme';
import {Card} from './index.js';
import React from 'react';
import * as mockData from '../../mockData';

describe('Card', () => {
  let wrapper;
  const movie = mockData.mockMovie[0];
  const mockAddFavorite = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <Card 
        information={movie} 
        addFavorite={mockAddFavorite} 
        logStatus={true}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call addFavorites with the right params on click', () => {
    wrapper.find('button').simulate('click');
    expect(mockAddFavorite).toHaveBeenCalledWith(movie);

  });
});
