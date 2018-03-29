import { shallow } from 'enzyme';
import { Card } from './index';
import React from 'react';
import { Favorites } from './index';
import * as mockData from '../../mockData';

describe('Favorite', () => {
  it('should match the snapshot', () => {
    const mockFunction = jest.fn();
    const wrapper = shallow(<Favorites favorites={mockData.mockMovie} handleClick={mockFunction} />);
    expect(wrapper).toMatchSnapshot()
  })

})