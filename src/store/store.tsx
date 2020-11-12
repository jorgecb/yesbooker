import { createStore, combineReducers, applyMiddleware  } from 'redux';
import { sucursalesReducer } from '../reducers/sucursalesReducer';
import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from "../redux/reducers";

const middleware = [thunk];

const reducers = combineReducers({
    rootReducer,
    sucursales: sucursalesReducer

});

export const store = createStore(
    reducers,
    devToolsEnhancer(
        name
   ));
   







