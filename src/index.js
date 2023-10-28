import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Index from './views/auth/Login';
import Dashboard from './views/admin/Dashboard';
import Teacher from './components/Teacher';
import './assets/styles/index.css';
import Test from './components/Test';

const App = () => (
  <BrowserRouter>
    <Switch>

      <Route exact path="/" component={Index} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/teacher" component={Teacher} />
      <Route path="/test" component={Test} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>
);

// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById('root'));

root.render(<App />);
