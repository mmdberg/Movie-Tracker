import React from 'react';
import { shallow } from 'enzyme';
import Form from './index';

describe('Form', () => {
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  it('should match the snapshot on signup page', () => {
    const wrapper = shallow(
      <Form 
        name={''}
        email={''}
        password={''}
        routeId={'signup'}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot on login page', () => {
    const wrapper = shallow(
      <Form 
        name={''}
        email={''}
        password={''}
        routeId={'login'}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should show an errorMessage if appropriate', () => {
    const wrapper = shallow(
      <Form
        errorMessage={"An error occured"}
        name={''}
        email={''}
        password={''}
        routeId={'login'}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});