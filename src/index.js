import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const router = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(router, document.getElementById('root'));
