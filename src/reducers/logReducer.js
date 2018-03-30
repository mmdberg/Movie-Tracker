const logReducer = (state = false, action) => {
  switch (action.type) {
  case 'CHANGE_LOG_STATUS':
    return action.status; 
  default: 
    return state;
  }
};

export default logReducer;