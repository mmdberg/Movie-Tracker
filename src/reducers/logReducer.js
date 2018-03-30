const logReducer = (state = false, actions) => {
  switch (actions.type) {
    case 'CHANGE_LOG_STATUS':
      return actions.status; 
    default: 
      return state;
  }
}

export default logReducer;