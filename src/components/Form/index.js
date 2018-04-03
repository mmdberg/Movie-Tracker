import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

const Form = (
  {errorMessage, name, email, password, routeId, handleChange, handleSubmit}
) => {
  const display = routeId === 'signup' ? "inline" : "none";
  const submitText = routeId === 'signup' ? "Sign Up" : "Log In";
  return (
    <form className='form' onSubmit={event => handleSubmit(event)}>
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

Form.propTypes = {
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  routeId: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default Form;
