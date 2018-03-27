import React, { Component } from 'react';
import './styles.css';
import { getMovie } from '../../helpers/api-helpers.js';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export class App extends Component {

  async componentDidMount() {
    const movies = await getMovie();
    this.props.loadCards(movies);
  }


  render() {
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

export default connect(null, mapDispatchToProps)(App);
