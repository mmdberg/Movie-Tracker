import * as mockData from '../../mockData';

/*eslint-disable id-blacklist*/
export const signIn = jest.fn().mockImplementationOnce(() =>
  Promise.reject({}))
  .mockImplementation(() => Promise.resolve({
    status: 'success',
    data: {
      email: 'taco@taco',
      name: 'taco',
      id: 2,
      password: 'taco'
    },
    message: 'Retrieved ONE User'
  }));

export const getUsers = jest.fn().mockImplementation(() => Promise.resolve({
  status: 'success',
  data: [{
    email: 'taco@taco',
    name: 'taco',
    id: 2,
    password: 'taco'
  }],
  message: 'Retrieved All Users'
}));

export const addUser = jest.fn().mockImplementation(() => Promise.resolve({
  id: 10,
  message:"New user created",
  status:"success"
}));

export const getMovies = jest.fn().mockImplementation(() =>
  Promise.resolve(mockData.mockMovie));

export const getUserFavorites = jest.fn().mockImplementation(() =>
  Promise.resolve(mockData.mockMovie));
