import React from 'react';
import SignUp from './index';
import { shallow } from 'enzyme';

describe('SignUp', () => {
  let wrapper;
  beforeEach( () => {
    wrapper = shallow(<SignUp />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
