import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { sucursalesReducer } from "../reducers/sucursalesReducer";
import { sociosReducer } from "../reducers/sociosReducer";
import { usuariosReducer } from "../reducers/usuariosReducer";
import { getRoles } from "../reducers/RolesReducer";

import rootReducer from "../redux/reducers";

export const reducers = combineReducers({
  rootReducer,
  sucursales: sucursalesReducer,
  socios: sociosReducer,
  usuarios: usuariosReducer,
  roles: getRoles,
});
const middlewareEnhancers = applyMiddleware(thunk);
const composedEnharcers = composeWithDevTools(...[middlewareEnhancers]);
export const store = createStore(reducers, composedEnharcers);
