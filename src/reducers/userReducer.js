const userReducer = (state = {}, action) => {
  switch (action.type) {
  case 'CAPTURE_USER':
    return action.user;
  case 'LOG_OUT_USER':
    return {};
  default: 
    return state;
  }
};

export default userReducer;

