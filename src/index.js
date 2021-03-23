import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Index from './components/Index';
import { store } from './store/store';

require ('./index.css');

setTimeout(() => {
  ReactDOM.render(
    <Provider store={ store }>
      <Router>
        <Index />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}, 3000);