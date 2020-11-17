import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { composeWithDevTools } from 'redux-devtools-extension'
import { sucursalesReducer } from '../reducers/sucursalesReducer';
import { sociosReducer } from '../reducers/sociosReducer';
import { usuariosReducer } from '../reducers/usuariosReducer';
const reducers = combineReducers({
    sucursales: sucursalesReducer,
    socios: sociosReducer,
    usuarios: usuariosReducer,
});
const middlewareEnhancers = applyMiddleware(thunk);
const composedEnharcers = composeWithDevTools(...[middlewareEnhancers]);
export const store = createStore(
    reducers, composedEnharcers
   );
