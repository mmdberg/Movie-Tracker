import { shallow } from 'enzyme';
import Card from './index.js';
import React from 'react';

describe('Card', () => {
  it('should match the snapshot', () => {
    let wrapper = shallow(<Card />);
    expect(wrapper).toMatchSnapshot();
  });
});