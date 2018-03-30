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
