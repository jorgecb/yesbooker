import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, roles, ...rest }: any) {
    return (
        <Route {...rest} render={props => {
            if (!localStorage.getItem('UserCredenciales')) {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
            
            return <Component {...props} />
        }} />
    );
}

function LoginRoute({ component: Component, roles, ...rest }: any) {
    return (
        <Route {...rest} render={props => {
            if (localStorage.getItem('UserCredenciales')) {
                return <Redirect to={{ pathname: '/admin', state: { from: props.location } }} />
            }
            
            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute,LoginRoute };



