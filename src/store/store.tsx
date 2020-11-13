import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { sucursalesReducer } from '../reducers/sucursalesReducer';
import { sociosReducer } from '../reducers/sociosReducer';
import { usuariosReducer } from '../reducers/usuariosReducer';
const reducers = combineReducers({
    sucursales: sucursalesReducer,
    socios: sociosReducer,
    usuarios: usuariosReducer,
});
export const store = createStore(
    reducers,
    devToolsEnhancer(
        name
   ));
