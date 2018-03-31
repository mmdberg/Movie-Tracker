import React from 'react';
import { shallow } from 'enzyme';
import { FormContainer, mapDispatchToProps } from './index';
import * as api from '../../apiCalls';
import * as actions from '../../actions';

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

    it('should update error message and reset inputs on error', async () => {
      const expected = {
        name: '',
        email: '',
        password: '',
        loggedIn: false,
        errorMessage: 'Email and password do not match'
      };

      await wrapper.instance().logIn(mockCredential);
      expect(wrapper.state())
        .toEqual(expected);
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

  describe('Add User', () => {
    let mockMatch;
    let wrapper;
    const mockUser = {
      email: 'taco@taco',
      name: 'taco',
      password: 'taco'
    };
    const mockUser2 = {
      email: 'pizza@pizza',
      name: 'pizza',
      password: 'pizza'
    };

    beforeEach(() => {
      mockMatch = { params: { id: 'signup'}};
      wrapper = shallow(
        <FormContainer 
          match={mockMatch}
          captureUser={mockCaptureUser}
          changeLogStatus={mockChangeLogStatus}
        />
      );
    });

    it('should call getUsers', () => {
      wrapper.instance().addUser(mockUser);
      expect(api.getUsers).toHaveBeenCalled();
    });

    it('should update errorMessage and reset inputs if user email has been used', async () => {
      const expected = {
        name: '',
        email: '',
        loggedIn: false,
        password: '',
        errorMessage: 
          'This email has already been used. Please log in or use a new email'
      };
      wrapper.setState({
        name: 'cheese',
        email: 'cheese@cheese'
      });
      await wrapper.instance().addUser(mockUser);
      expect(wrapper.state()).toEqual(expected);
    });

    it('should call addUser with right params if user email has not been used', async () => {
      await wrapper.instance().addUser(mockUser2);
      expect(api.addUser).toHaveBeenCalledWith(mockUser2);
    });

    it('should call captureUser with the right params for new user', () => {
      wrapper.instance().addUser(mockUser2);
      expect(mockCaptureUser).toHaveBeenCalledWith({...mockUser2, id: 10});
    });

    it('should call changeLogStatus with the right params', () => {
      wrapper.instance().addUser(mockUser2);
      expect(mockChangeLogStatus).toHaveBeenCalledWith(true);
    });

    it('should reset inputs and set loggedIn state to true', async () => {
      const expected = {
        name: '',
        email: '',
        password: '',
        loggedIn: true,
        errorMessage: ''
      };
      wrapper.setState({
        name: 'cheese',
        email: 'cheese@cheese'
      });
      await wrapper.instance().addUser(mockUser2);
      expect(wrapper.state()).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    
    it('should call dispatch with right params for captureUser', () => {
      const mapped = mapDispatchToProps(mockDispatch);
      const mockUser = {name: 'tim'};
      
      mapped.captureUser(mockUser);

      expect(mockDispatch).toHaveBeenCalledWith(actions.captureUser(mockUser));
    });

    it('should call dispatch with right params for changeLogStatus', () => {
      const mapped = mapDispatchToProps(mockDispatch);

      mapped.changeLogStatus(false);

      expect(mockDispatch).toHaveBeenCalledWith(actions.changeLogStatus(false));
    });
  });
});