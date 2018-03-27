import React, { Component } from 'react';
import './styles.css';
import { getMovie } from '../../helpers/api-helpers.js';

class App extends Component {

  async componentDidMount() {
    const movie = await getMovie()
    console.log(movie)

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

export default App;
