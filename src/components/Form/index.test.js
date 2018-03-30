import React from 'react';
import { shallow } from 'enzyme';
import Form from './index';

describe('Form', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper).toMatchSnapshot();
  });
});
