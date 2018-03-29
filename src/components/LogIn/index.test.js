import React from 'react';
import LogIn from './index';
import { shallow } from 'enzyme';

describe('LogIn', () => {
  let wrapper;

  beforeEach( () => {
    wrapper = shallow(<LogIn />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a method of handleChange', () => {
    wrapper.instance().handleChange({
      target: {
        value: 'taco',
        name: 'email'
        }
      }
    );
    expect(wrapper.state('email')).toEqual('taco');
  });
});
