const userReducer = (state = '', actions) => {
  switch (actions.type) {
  case 'CAPTURE_USER_ID':
    return actions.id;
  default: 
    return state;
  }
};

export default userReducer;

