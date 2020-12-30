
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { sucursalesReducer } from '../reducers/sucursalesReducer';
import { sociosReducer } from '../reducers/sociosReducer';
import { usuariosReducer } from '../reducers/usuariosReducer';
import { clientesReducer } from '../reducers/clientesReducer';
const reducers = combineReducers({
    sucursales: sucursalesReducer,
    socios: sociosReducer,
    usuarios: usuariosReducer,
    clientes: clientesReducer,
});
const middlewareEnhancers = applyMiddleware(thunk);
const composedEnharcers = composeWithDevTools(...[middlewareEnhancers]);
export const store = createStore(
    reducers, composedEnharcers
);




