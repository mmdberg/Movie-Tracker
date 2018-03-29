import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loggedIn: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.logIn({email, password})
    this.setState({
      email: '',
      password: '',
      loggedIn: true
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password, loggedIn } = this.state;
    return loggedIn ? <Redirect to='/' /> : (
      <form onSubmit={ event => this.handleSubmit(event)}>
        <input
          type='email'
          name='email'
          placeholder='email'
          value={email}
          onChange={ event => this.handleChange(event)}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          value={password}
          onChange={ event => this.handleChange(event)}
        />
        <button type='submit'>Log In</button>
      </form>
    );
  }
}
