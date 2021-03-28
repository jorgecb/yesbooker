import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { sucursalesReducer } from "../reducers/sucursalesReducer";
import { sociosReducer } from "../reducers/sociosReducer";
import { usuariosReducer } from "../reducers/usuariosReducer";
import { getRoles } from "../reducers/RolesReducer";
import { clientesReducer } from "../reducers/clientesReducer";
import { mesasReducer } from "../reducers/mesasReducer";
import auth from "../reducers/authStore";

export const reducers = combineReducers({
  auth,
  roles: getRoles,
  sucursales: sucursalesReducer,
  socios: sociosReducer,
  usuarios: usuariosReducer,
  clientes: clientesReducer,
  mesas: mesasReducer,
});
const middlewareEnhancers = applyMiddleware(thunk);
const composedEnharcers = composeWithDevTools(...[middlewareEnhancers]);
export const store = createStore(reducers, composedEnharcers);
