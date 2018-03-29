import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../../apiCalls';
import  { connect } from 'react-redux';
import * as actions from '../../actions'

export class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      errorMessage: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, errorMessage } = this.state;
    this.logIn({email, password})
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  logIn = async credentials => {
    try { 
      const validation = await api.signIn(credentials);
      this.props.captureUser(validation.data)
      this.setState({
        email: '',
        password: '',
        loggedIn: true
      })
    } catch (error) {
      this.setState({
        errorMessage: 'Email and password do not match',
        email: '',
        password: ''
      })
    }
  }

  render() {
    const { email, password, loggedIn, errorMessage } = this.state;
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
        <p>{errorMessage}</p>
      </form>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  captureUser: user => dispatch(actions.captureUser(user))
})

export default connect(null, mapDispatchToProps)(LogIn)
