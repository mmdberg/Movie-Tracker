import React from 'react';
import { shallow } from 'enzyme';
import { FormContainer } from './index';
import * as api from '../../apiCalls';

jest.mock('../../apiCalls');

describe('FormContainer', () => {
  let wrapper;
  let mockMatch;
  const mockCaptureUser = jest.fn();
  const mockChangeLogStatus = jest.fn();

  beforeEach(() => {
    mockMatch = { params: { id: 'login'}};
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

  it('should call logIn with right params if user is on login page', () => {
    const mockEvent = { preventDefault: jest.fn() };
    let expected = {
      email: 'taco@taco',
      password: 'taco'
    };
    wrapper.setState(expected);
    wrapper.instance().logIn = jest.fn();
    wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.instance().logIn).toHaveBeenCalledWith(expected);

  });

  it('should call addUser with right params if user is on signup page', () => {
    const mockEvent = { preventDefault: jest.fn() };
    let mockMatch = { params: { id: 'signup'}};
    let expected = {
      name: 'Taco',
      email: 'taco@taco',
      password: 'taco'
    };
    let wrapper = shallow(
      <FormContainer 
        match={mockMatch}
        captureUser={mockCaptureUser}
        changeLogStatus={mockChangeLogStatus}
      />);
    wrapper.setState(expected);
    wrapper.instance().addUser = jest.fn();
    wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.instance().addUser).toHaveBeenCalledWith(expected);
  });

  describe('LogIn', () => {
    const mockCredential = {
      email: 'taco@taco',
      password: 'taco'
    };

    it('should update error message in state on error', async () => {
      await wrapper.instance().logIn(mockCredential);
      expect(wrapper.state('errorMessage'))
        .toEqual('Email and password do not match');
    });

    it('should call signIn with the right params', () => {
      wrapper.instance().logIn(mockCredential);
      expect(api.signIn).toHaveBeenCalledWith(mockCredential);
    });

    it('should call captureUser with the right params', () => {
      let expected = {
        email: 'taco@taco',
        name: 'taco',
        id: 2,
        password: 'taco'
      };
      wrapper.instance().logIn(mockCredential);
      expect(mockCaptureUser).toHaveBeenCalledWith(expected);
    });

    it('should call changeLogStatus with the right params', () => {
      wrapper.instance().logIn(mockCredential);
      expect(mockChangeLogStatus).toHaveBeenCalledWith(true);
    });

    it('should reset state', async () => {
      const expected = {
        name: '',
        email: '',
        password: '',
        loggedIn: true,
        errorMessage: ''
      };
      wrapper.setState({
        email: 'taco@taco',
        password: 'taco'
      });
      await wrapper.instance().logIn(mockCredential);
      expect(wrapper.state()).toEqual(expected);
    });
  });
});
