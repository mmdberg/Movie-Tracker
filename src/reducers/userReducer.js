const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'CAPTURE_USER':
    return action.user;
  case 'LOG_OUT_USER':
    return null;
  default:
    return state;
  }
};

export default userReducer;
