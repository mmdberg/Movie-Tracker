import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import * as api from '../../apiCalls';
import Form from '../../components/Form';

export class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      loggedIn: false,
      errorMessage: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  
  handleSubmit = event => {
    event.preventDefault();
    const { email, password, name } = this.state;
    const { id } = this.props.match.params;
    if (id === 'login') {
      this.logIn({ email, password });
    } else {
      this.addUser({name, email, password});
    }
  }

  logIn = async credentials => {
    try {
      const validation = await api.signIn(credentials);
      this.props.captureUser(validation.data);
      this.setState({
        email: '',
        password: '',
        loggedIn: true
      });
    } catch (error) {
      this.setState({
        errorMessage: 'Email and password do not match',
        email: '',
        password: ''
      });
    }
  }

  addUser = async user => {
    const userList = await api.getUsers()
    const validation = userList.data.find(registeredUser => user.email === registeredUser.email)
    if (validation) {
      this.setState({
        name: '',
        email: '',
        password: '',
        errorMessage: 'This email has already been used. Please log in or use a new email'
      })
    } else {
      const newUser = await api.addUser(user);
      this.props.captureUser({ ...user, id: newUser.id });
      this.setState({
        email: '',
        password: '',
        loggedIn: true
      });
    }
  }

  render() {
    const {name, email, password, errorMessage, loggedIn} = this.state;
    const {id} = this.props.match.params;
    return loggedIn ? <Redirect to="/" /> :
    (<Form 
        email={email}
        errorMessage={errorMessage}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        name={name}
        password={password}
        routeId={id}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  captureUser: user => dispatch(actions.captureUser(user))
});

FormContainer.propTypes = {
  captureUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(FormContainer);