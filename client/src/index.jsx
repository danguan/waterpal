import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';

import App from './components/App.jsx';
import './styles/css/main.css';

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" render={({ history }) => <App history={history} />} />
  </BrowserRouter>,
  document.getElementById('app')
);
