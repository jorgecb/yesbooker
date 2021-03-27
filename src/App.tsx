
import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
/* 
import { history } from '../_helpers';
import { alertActions } from '../_actions';*/
import { PrivateRoute, LoginRoute } from './layouts/Rutas'; 
import  admin  from './layouts/Admin';
import Login from './layouts/login';
import { createBrowserHistory } from 'history';

const hist = createBrowserHistory();


function App() {


return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    <Router history={hist}>
                        <Switch>
                            <PrivateRoute exact path="/admin" component={admin} />
                            <PrivateRoute exact path="/admin/usuarios" component={admin} />

                            <PrivateRoute exact path="/admin/Socios" component={admin} />
                            <PrivateRoute exact path="/admin/Sucursales" component={admin} />
                            <PrivateRoute exact path="/admin/Clientes" component={admin} />
                            <PrivateRoute exact path="/admin/Zonas" component={admin} />
                            <PrivateRoute exact path="/admin/Mesas" component={admin} />
                            <LoginRoute path="/login" component={Login} />
                            <Redirect from="*" to="/login" />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export { App };