import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getMovies } from '../../apiCalls/';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './styles.css';
import CardContainer from '../CardContainer';
import { Route, Switch, NavLink } from 'react-router-dom';
import Login from '../../components/Login';

export class App extends Component {

  componentDidMount = async () => {
    const movies = await getMovies();
    this.props.loadCards(movies);
  }
  addUser = user => {

  }
  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Movie Tracker</h1>
        </header>
        <Switch>
          <Route path='/' component={CardContainer}/>
          <Route path='/login' render={() => <Login addUser={this.addUser} /> } />
        </Switch>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    loadCards: movies => dispatch(actions.loadCards(movies))
  };
};

App.propTypes = {
  loadCards: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(App);
