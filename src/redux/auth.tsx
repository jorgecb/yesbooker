import {

  LOGOUT,
} from "./actions/types";

import AuthService from "./actions/actions";






export const logout = () => (dispatch: any) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
