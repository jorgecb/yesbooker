import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

// core components 
import Admin from './layouts/Admin';


import './assets/css/App.css';

import 'assets/css/material-dashboard-react.css?v=1.6.0';

const hist = createBrowserHistory();


import Login from './layouts/Login/Login';

/* 
function App() {
  return 
}
export default App;

 */



ReactDOM.render(

  // tslint:disable-next-line: jsx-wrap-multiline
  <Router history={hist}>
    <Switch>
      <Login />
      <Route path="/admin" component={Admin} />

      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>,
  document.getElementById('root')
);

