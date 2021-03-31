import { types } from "../types/types";
import BaseUrl from "../config";
import Rol from "../database/AcRoles";
import { HaderAccessGET } from "./HaderAccess";


export const getRoles = (data: any, displayName: any) => {
  return (dispatch: any) => {
    fetch(BaseUrl.UrlApi + "Usuario/roles", HaderAccessGET).then((response) => {
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

 const fetchRoles = (data: {}, displayName: any) => ({
  type: types.getRoles,
  payload: {
    data,
    displayName,
  },
});
