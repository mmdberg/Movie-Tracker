import React from 'react';
import { App, mapDispatchToProps } from './index';
import { shallow } from 'enzyme';
import * as actions from '../../actions';
import mockMovies from '../../mockData';

describe('App', () => {
  let wrapper;

  beforeEach( () => {
    wrapper = shallow(
      <App user={{}} loadCards={jest.fn()} captureUser={jest.fn()}/>,
      { disableLifecycleMethods: true });
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  it('should call dispatch with the right params', () => {
    const mockDispatch = jest.fn();

    const mapped = mapDispatchToProps(mockDispatch);
    mapped.loadCards(mockMovies);

    const expected = actions.loadCards(mockMovies);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
});
