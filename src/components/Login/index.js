import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import  PropTypes from 'prop-types';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      loggedIn: false
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addUser(this.state);
    this.setState({
      name: '',
      email: '',
      password: '',
      loggedIn: true
    });
  }

  handleChange = event => {
    const {value, name} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const {name, email, password, loggedIn} = this.state;
    return loggedIn ? <Redirect to="/" /> :
      (<form onSubmit={event => this.handleSubmit(event)}>
        <input
          value={name}
          name="name"
          onChange={event => this.handleChange(event)}
          type='text'
          placeholder='enter name'
          aria-label='name'
        />
        <input
          value={email}
          name="email"
          onChange={event => this.handleChange(event)}
          type='email'
          placeholder='enter email'
          aria-label='email'
        />
        <input
          value={password}
          name="password"
          onChange={event => this.handleChange(event)}
          type='password'
          placeholder='password'
          aria-label='password'
        />
        <button type='submit'>Enter</button>
      </form>
      );
  }
}

Login.propTypes = {
  addUser: PropTypes.func
};
