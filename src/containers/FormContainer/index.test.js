import React from 'react';
import { shallow } from 'enzyme';
import { FormContainer } from './index';

describe('FormContainer', () => {
  let wrapper;
  let mockMatch;
  const mockCaptureUser = jest.fn();
  const mockChangeLogStatus = jest.fn();
  beforeEach(() => {
    mockMatch = { params: { id: ''}};
    wrapper = shallow(
      <FormContainer 
        match={mockMatch}
        captureUser={mockCaptureUser}
        changeLogStatus={mockChangeLogStatus}
      />
    );

  });
  
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should start with a default state', () => {
    const expected = {
      name: '',
      email: '',
      password: '',
      loggedIn: false,
      errorMessage: ''
    };
    expect(wrapper.state()).toEqual(expected);
  });

  it('should update state with entered inputs', () => {
    const mockEvent = { 
      target: {
        name: 'email',
        value: 'taco@taco'
      }
    };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('email')).toEqual('taco@taco');
  });
});
