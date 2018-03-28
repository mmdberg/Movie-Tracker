import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getMovies } from '../../apiCalls/';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './styles.css';

export class App extends Component {

  componentDidMount = async () => {
    const movies = await getMovies();
    this.props.loadCards(movies);
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Movie Tracker</h1>
        </header>
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