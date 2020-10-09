import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { alertActions } from './redux/alert.actions';
import { PrivateRoute } from './redux/PrivateRoute';
import  Dashboard  from './layouts/Admin';
import  Login  from './layouts/login';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={Dashboard} />
                            <Route path="/login" component={Login} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export { App };