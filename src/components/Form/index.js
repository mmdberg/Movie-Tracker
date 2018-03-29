import React from 'react';

const Form = (
  {errorMessage, name, email, password, routeId, handleChange, handleSubmit}
) => {
  const display = routeId === 'signup' ? "inline" : "none";
  const submitText = routeId === 'signup' ? "Sign Up" : "Log In";
  return (
    <form onSubmit={event => handleSubmit(event)}>
      <input 
        style={{display}}
        type='text'
        name='name'
        placeholder="name"
        value={name}
        onChange={event => handleChange(event)}
      />
      <input
        type='email'
        name='email'
        placeholder='email'
        value={email}
        onChange={event => handleChange(event)}
      />
      <input
        type='password'
        name='password'
        placeholder='password'
        value={password}
        onChange={event => handleChange(event)}
      />
      <button type='submit'>{submitText}</button>
      <p>{errorMessage}</p>
    </form>
  );
};

export default Form;