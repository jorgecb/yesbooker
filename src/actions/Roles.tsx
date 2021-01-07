import { types } from "../types/types";
import BaseUrl from "../config";
import Rol from "../database/AcRoles";

export const getRoles = (data: any, displayName: any) => {
  return (dispatch: any) => {
    let user = JSON.parse(localStorage.getItem("UserCredenciales") || "{}");
    const initialState = user.tkn;
    let myHeaders = new Headers();
    myHeaders.append("tkn", initialState);
    var requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(BaseUrl.UrlApi + "Usuario/roles", requestOptions).then(function(
      response
    ) {
      if (response.status === 200) {
        Rol.limTab();
        response.text().then((result) => {
          dispatch(fetchRoles(JSON.parse(result), displayName));
          let algo: any = JSON.parse(result);
          algo.data.map((item: any, i: any) => {
            console.log(item.Roles);
            const setData = {
              rol: item.Roles,
            };
            Rol.add(setData);
          });
        });
        return;
      } else {
        console.log(response.status);
        response.text().catch((error) => console.log("error", error));
        return;
      }
    });
  };
};

export const fetchRoles = (data: {}, displayName: any) => ({
  type: types.getRoles,
  payload: {
    data,
    displayName,
  },
});
