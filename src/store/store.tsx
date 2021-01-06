import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { sucursalesReducer } from '../reducers/sucursalesReducer';
import { sociosReducer } from '../reducers/sociosReducer';
import { usuariosReducer } from '../reducers/usuariosReducer';
import { zonasReducer } from '../reducers/zonasReducer';
const reducers = combineReducers({
    sucursales: sucursalesReducer,
    socios: sociosReducer,
    usuarios: usuariosReducer,
    zonas: zonasReducer,
});
export const store = createStore(
    reducers,
    devToolsEnhancer(
        name
   ));