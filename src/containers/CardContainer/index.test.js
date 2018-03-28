import { shallow } from 'enzyme';
import React from 'react';
import { CardContainer } from './index.js';


describe('Card Container', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardContainer />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });


});