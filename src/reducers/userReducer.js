const userReducer = (state = {}, actions) => {
  switch (actions.type) {
  case 'CAPTURE_USER':
    return actions.user;
  case 'LOG_OUT_USER':
    return {};
  default: 
    return state;
  }
};

export default userReducer;

