import userReducer from './userReducer';
import * as actions from '../actions';

describe('User Reducer', () => {
  const mockUser = {name: "bill", email: "bill@gmail.com", id: 5};

  it('should return default state', () => {
    expect(userReducer(undefined, {})).toEqual({});
  });

  it('should add user to store', () => {
    expect(userReducer(undefined, actions.captureUser(mockUser)))
      .toEqual(mockUser);
  });

  it('should remove user from the store', () => {
    expect(userReducer(mockUser, actions.logOutUser())).toEqual({});
  });
});