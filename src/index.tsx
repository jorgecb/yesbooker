import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

// core components 
import Admin from './layouts/Admin';
import Login from './layouts/Login/Login';



import './assets/css/App.css';

import 'assets/css/material-dashboard-react.css?v=1.6.0';

const hist = createBrowserHistory();







ReactDOM.render(

  <Router history={hist}>
    <Switch>
    <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />

      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>,
  document.getElementById('root')
);

