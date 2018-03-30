import logReducer from './logReducer';
import * as actions from '../actions';

describe('Log Reducer', () => {
  it('should return default state', () => {
    expect(logReducer(undefined, {})).toEqual(false);
  });

  it('should change logged in status', () => {
    expect(logReducer(false, actions.changeLogStatus(true))).toEqual(true);
  });
});
