import userReducer from './userReducer';
import * as actions from '../actions';

describe('User Reducer', () => {
  it('should return default state', () => {
    expect(userReducer(undefined, {})).toEqual('');
  });

  it('should add user id to store', () => {
    const id = 5;
    expect(userReducer(undefined, actions.captureUserId(id))).toEqual(id);
  });

});