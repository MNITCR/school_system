import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Index from './views/auth/Login';
import Dashboard from './views/admin/Dashboard';
import './assets/styles/index.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/dashboard" component={Dashboard} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
