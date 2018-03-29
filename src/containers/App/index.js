import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../../apiCalls/';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './styles.css';
import CardContainer from '../CardContainer';
import Favorite from '../Favorites';
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';
import Login from '../../components/Login';

export class App extends Component {

  componentDidMount = async () => {
    const movies = await api.getMovies();
    this.props.loadCards(movies);
  }

  addUser = async user => {
    const validation = await api.addUser(user);
    this.props.captureUserID(validation.id);
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Movie Tracker</h1>
          <NavLink to='/login/'>Sign In/Sign Up</NavLink>
          <NavLink to='/favorites/'>Favorites</NavLink>
        </header>
        <Switch>
          <Route exact path='/' component={CardContainer}/>
          <Route exact path='/login/' render={() => 
            <Login addUser={this.addUser} /> } />
          <Route exact path='/favorites/' component={Favorite}/> 
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = state => {
  userID: state.userID;
};

export const mapDispatchToProps = dispatch => {
  return {
    loadCards: movies => dispatch(actions.loadCards(movies)),
    captureUserID: id => dispatch(actions.captureUserId(id))
  };
};

App.propTypes = {
  loadCards: PropTypes.func.isRequired,
  captureUserID: PropTypes.func,
  userID: PropTypes.number
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
