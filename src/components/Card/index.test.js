import { shallow } from 'enzyme';
import {Card} from './index.js';
import React from 'react';
import * as mockData from '../../mockData';
import * as helper from '../../helpers';

describe('Card', () => {
  const movie = helper.moviesWrangler(mockData.mockMovies)[0];

  it('should match the snapshot', () => {
    const wrapper = shallow(<Card {...movie}/>);
    expect(wrapper).toMatchSnapshot();
  });
});