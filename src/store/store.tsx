import { createStore, combineReducers, applyMiddleware  } from 'redux';
import { sucursalesReducer } from '../reducers/sucursalesReducer';
import { devToolsEnhancer } from 'redux-devtools-extension';
const reducers = combineReducers({
    sucursales: sucursalesReducer
});
export const store = createStore(
    reducers,
    devToolsEnhancer(
        name
   ));