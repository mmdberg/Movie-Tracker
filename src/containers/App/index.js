import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../../apiCalls/';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './styles.css';
import CardContainer from '../CardContainer';
import Favorite from '../Favorites';
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';
import FormContainer from '../FormContainer';

export class App extends Component {

  componentDidMount = async () => {
    const movies = await api.getMovies();
    this.props.loadCards(movies);
  }

  logOut = () => {
    this.props.changeLogStatus(false);
    this.props.logOutUser();
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Movie Tracker</h1>
          {
            this.props.user.email ? (
              <div>
                <NavLink to='/favorites/'>Favorites</NavLink>
                <button onClick={() => this.logOut()}>Log Out</button>
              </div>
            ) : (
              <div>
                <NavLink to='/forms/signup'>Sign Up</NavLink>
                <NavLink to='/forms/login'>Log In</NavLink>
              </div>
            )
          }
          <NavLink to='/'>Home</NavLink>
        </header>
        <Switch>
          <Route exact path='/' component={CardContainer}/>
          <Route exact path='/forms/:id' render={({match}) => 
            <FormContainer match={match}/>} />
          <Route exact path='/favorites/' component={Favorite}/>
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => {
  return {
    loadCards: movies => dispatch(actions.loadCards(movies)),
    captureUser: user => dispatch(actions.captureUser(user)),
    logOutUser: () => dispatch(actions.logOutUser()),
    changeLogStatus: boolean => dispatch(actions.changeLogStatus(boolean))
  };
};

App.propTypes = {
  loadCards: PropTypes.func.isRequired,
  captureUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number
  }),
  logOutUser: PropTypes.func.isRequired,
  changeLogStatus: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
