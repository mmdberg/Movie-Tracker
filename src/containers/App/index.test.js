import React from 'react';
import { App, mapDispatchToProps } from './index';
import { shallow } from 'enzyme';
import * as actions from '../../actions';
import mockMovies from '../../mockData';

describe('App', () => {
  let wrapper;
  const mockLoadCards = jest.fn();
  const mockCaptureUser = jest.fn();
  const mockLogOutUser = jest.fn();
  const mockChangeLogStatus = jest.fn();
  
  beforeEach( () => {
    wrapper = shallow(
      <App 
        user={{}}
        loadCards={mockLoadCards}
        captureUser={mockCaptureUser}
        logOutUser={mockLogOutUser}
        changeLogStatus={mockChangeLogStatus}
      />,
      { disableLifecycleMethods: true });
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  it('should call dispatch with the right params for loadCards', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    const expected = actions.loadCards(mockMovies);

    mapped.loadCards(mockMovies);

    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should call dispatch with the right params for captureUser', () => {
    const mockUser = {name: 'taco', email: 'tac0@taco', password: 'burrito'};
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    const expected = actions.captureUser(mockUser);

    mapped.captureUser(mockUser);

    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should call dispatch with the right params for captureUser', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    const expected = actions.logOutUser();

    mapped.logOutUser();

    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should call dispatch with the right params for captureUser', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    const expected = actions.logOutUser();

    mapped.logOutUser();

    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
});
