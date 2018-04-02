import React from 'react';
import { App, mapDispatchToProps, mapStateToProps } from './index';
import { shallow, mount } from 'enzyme';
import * as actions from '../../actions';
import * as mockData from '../../mockData';
import * as api from '../../apiCalls';

jest.mock('../../apiCalls');

class LocalStorage {
  constructor() {
    this.store = {};
  }
  setItem(key, string) {
    this.store[key] = string;
  }
  getItem(key) {
    return this.store[key];
  }
  clear() {
    this.store = {}
  }
}

global.localStorage = new LocalStorage;

describe('App', () => {
  let wrapper;
  const mockLoadCards = jest.fn();
  const mockCaptureUser = jest.fn();
  const mockLogOutUser = jest.fn();
  const mockChangeLogStatus = jest.fn();
  const mockLoadFavorites = jest.fn();
  const mockFetchLoggedInUserData = jest.fn();
  const mockFetchRecentMovies = jest.fn();
  const mockUser = {
    name: 'Taco',
    id: 1,
    email: 'taco@taco',
    password: 'taco'
  };

  beforeEach( () => {

    wrapper = shallow(
      <App
        user={mockUser}
        loadCards={mockLoadCards}
        captureUser={mockCaptureUser}
        logOutUser={mockLogOutUser}
        changeLogStatus={mockChangeLogStatus}
        loadFavorites={mockLoadFavorites}
      />,
      { disableLifecycleMethods: true });
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });


  it('should be able to fetch recent movies', () => {
    wrapper.instance().fetchRecentMovies();
    expect(api.getMovies).toHaveBeenCalled();
  });

  it.skip('should load user and favorites if user in local storage', () => {

    localStorage.setItem('Last User', JSON.stringify(mockUser));
    const itemsInStorage = JSON.parse(localStorage.getItem('Last User')).length;
  })

  it('should call loadCards after fetching recents', () => {
    wrapper.instance().fetchRecentMovies();
    expect(mockLoadCards).toHaveBeenCalledWith(mockData.mockMovie);
  });

  it('should fetch user favorites', () => {
    wrapper.instance().fetchLoggedInUserData();
    expect(api.getUserFavorites).toHaveBeenCalledWith(1);
  });

  it('should store favorites after fetching', () => {
    wrapper.instance().fetchLoggedInUserData();
    expect(mockLoadFavorites).toHaveBeenCalledWith(mockData.mockMovie);
  });

  it('should fetch logged in user data upon logging in', () => {
    wrapper.instance().fetchLoggedInUserData = mockFetchLoggedInUserData;
    wrapper.instance().componentDidUpdate({user: {id: 0}});
    expect(mockFetchLoggedInUserData).toHaveBeenCalled();
  });

  it.skip('should set local storage after fetching user data', () => {
    localStorage.clear()    
    wrapper.instance().fetchLoggedInUserData();
    const itemsInStorage = JSON.parse(localStorage.getItem("Last User"));
    expect(itemsInStorage.length).toEqual(1)
  })

  it('should fetch movies after mounting', () => {
    wrapper.instance().fetchRecentMovies = mockFetchRecentMovies;
    wrapper.instance().componentDidMount();
    expect(mockFetchRecentMovies).toHaveBeenCalled();
  });

  it('should have a method called logOut', () => {
    wrapper.instance().logOut();
    expect(mockChangeLogStatus).toHaveBeenCalledWith(false);
  });
});

describe('mapDispatchToProps', () => {
  it('should call dispatch with the right params for loadCards', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    const expected = actions.loadCards(mockData.mockMovies);

    mapped.loadCards(mockData.mockMovies);

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

  it('should call dispatch with the right params for logOutUser', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    const expected = actions.logOutUser();

    mapped.logOutUser();

    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should call dispatch with the right params for changeLogStatus', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    const expected = actions.changeLogStatus(false);

    mapped.changeLogStatus(false);

    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should call dispatch with the right params for loadFavorites', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    const expected = actions.loadFavorites(mockData.mockMovie);

    mapped.loadFavorites(mockData.mockMovie);

    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
});

describe('mapStateToProps', () => {
  it('should return an object with user and user state', () => {
    const expected = {user: {name: 'tom'}};
    expect(mapStateToProps({ user: { name: 'tom' } })).toEqual(expected);
  });
});