import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addUser(this.state);
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <input
          value={this.state.name}
          onChange={(event) => this.setState({ name: event.target.value})}
          type='text'
          placeholder='enter name'
          aria-label='name'
        />
        <input
          value={this.state.email}
          onChange={(event) => this.setState({ email: event.target.value})}
          type='email'
          placeholder='enter email'
          aria-label='email'
        />
        <input
          value={this.state.password}
          onChange={(event) => this.setState({ password: event.target.value})}
          type='password'
          placeholder='password'
          aria-label='password'
        />
        <button type='submit'>Enter</button>
      </form>
    );
  }
}
