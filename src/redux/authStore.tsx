import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./actions/types";

let user = JSON.parse(localStorage.getItem('UserCredenciales') || '{}');

const initialState = user.tkn
  ? { LoginActivo: true, user }
  : { LoginInactivo: false, user: null };

export default function (state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
