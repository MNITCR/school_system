import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import "./assets/styles/index.css";

// layouts

// views without layouts
// import Index from "./views/auth/Login";
import Index from "./views/admin/Dashboard";

ReactDOM.render(
  <Router>
    <Switch>
      {/* add routes with layouts */}
      {/* <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} /> */}
      {/* add routes without layouts */}
      {/* <Route path="/landing" exact component={Landing} /> */}
      {/* <Route path="/profile" exact component={Profile} /> */}
      <Route path="/" exact component={Index} />
      {/* add redirect for the first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
