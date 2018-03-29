import React, { Component } from 'react';

export default class LogIn extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <form>
        <input
          type='email'
          name='email'
          value={email}
          onChange={ event => this.handleChange(event)}
        />
        <input
          type='password'
          name='password'
          value={password}
          onChange={ event => this.handleChange(event)}
        />
        <button type='submit'>Log In</button>
      </form>
    )
  }
}
