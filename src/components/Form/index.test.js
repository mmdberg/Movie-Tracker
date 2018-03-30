import React from 'react';
import { shallow } from 'enzyme';
import Form from './index';

describe('Form', () => {
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  it('should match the snapshot', () => {
    const wrapper = shallow(
      <Form 
        name={''}
        email={''}
        password={''}
        routeId={''}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
