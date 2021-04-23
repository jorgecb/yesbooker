import { types } from "../types/types";
import { data } from "./UserConst";
import BaseUrl from "../config";
import ZonasDB from "../database/Zonas";
import { HaderAccessGET, HaderAccessDELETE } from "./HaderAccess";

const condition = navigator.onLine;

export const getZonas = (data: any, displayName: any) => {
  return (dispatch: any) => {
    if (condition) {
      ZonasDB.search().then((dev) => {
        if (dev) {
          console.log(dev);
          const zona = (dataZona: any) => dispatch(postZona(dataZona, "add"));
          dev.map(zona);
          ZonasDB.limTab();
        } else {
          ZonasDB.limTab();
          console.log("no hay nada");
        }
      });

      fetch(BaseUrl.UrlApi + "Zonas/index", HaderAccessGET).then((response) => {
        if (response.status == 200) {
          response.text().then((result) => {
            dispatch(fetchZonas(JSON.parse(result), displayName));
            let algo: any = JSON.parse(result);

            algo.mensaje.map((item: any, i: any) => {
              let setData = {
                id: Number(item.id),
                nombre_zona: item.nombre_zona,
                descripcion: item.descripcion,
                areaFumador: item.areaFumador,
                interperie: item.interperie,
                deleted: false,
                inserver: true,
              };
              ZonasDB.add(setData);
            });
          });
          return;
        } else {
          console.log("Error de red");
          console.log(response.status);
          response.text().catch((error) => console.log("error", error));
          return;
        }
      });
    } else {
      alert("Modo Local");
    }
  };
};

export const postZona = (data: any, displayName: any) => {
  console.log(data.nombre_zona);

  let user = JSON.parse(localStorage.getItem("UserCredenciales") || "{}");
  let initialState = user.tkn;

  let myHeaders = new Headers();
  myHeaders.append("tkn", initialState);
  myHeaders.append("Accept", "application/x-www-form-urlencoded");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let urlencoded = new URLSearchParams();

  urlencoded.append("nombre_zona", data.nombre_zona);
  urlencoded.append("descripcion", data.descripcion);
  urlencoded.append("id_usuario", "1000");

  let requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return (dispatch: any) => {
    if (condition) {
      fetch(BaseUrl.UrlApi + "Zonas/registrar", requestOptions).then(
        (response) => {
          response.text().then((result) => {
            console.log(response.status);
            let algo: any = JSON.parse(result);
            if (response.status == 200) {
              dispatch(addZona(JSON.parse(result), displayName));

              console.log(algo);
            } else {
              console.log(algo);
            }
          });
        }
      );
    } else {
      console.log(condition);
      alert("Se guardo en local");
      ZonasDB.add(data);
    }
  };
};

/*export const putUsuarios = (id: any, data: any) => {
  let user = JSON.parse(localStorage.getItem("UserCredenciales") || "{}");
  let initialState = user.tkn;
  let myHeaders = new Headers();
  myHeaders.append("tkn", initialState);
  myHeaders.append("Accept", "application/x-www-form-urlencoded");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let urlencoded = new URLSearchParams();
  console.log(data.nombre);
  urlencoded.append("apellido", data.apellido);
  urlencoded.append("nombre", data.nombre);

  const HaderAccessPUT: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch(BaseUrl.UrlApi + "Usuario/put/" + id, HaderAccessPUT).then(
    (response) => {
      console.log(response.status);
      if (response.status === 200) {
        uptUsuario(uptUsuario, "actualizado");
        console.log("pas");
        console.log(response.status);
        return;
      } else {
        console.log(response);
        console.log("no pass");
      }
    }
  );
};
*/
export const deletedZona = (id: any, displayName: any) => {
  console.log(id);
  console.log(displayName);

  fetch(BaseUrl.UrlApi + "Usuario/delete/" + id, HaderAccessDELETE).then(
    (response) => {
      console.log(response.status);
      if (response.status === 200) {
        delZona(delZona, "Del");
        console.log("pas");
        console.log(response.status);
        return;
      } else {
        delZona(delZona, "Del");
        console.log(response);
        console.log("no pass");
      }
    }
  );
};

export const fetchZonas = (data: {}, displayName: any) => ({
  type: types.getZonas,
  payload: {
    data,
    displayName,
  },
});

export const addZona = (data: {}, displayName: any) => ({
  type: types.AgregarZona,
  payload: {
    data,
    displayName,
  },
});
export const uptUsuario = (data: {}, displayName: any) => ({
  type: types.uptUsuario,
  payload: {
    data,
    displayName,
  },
});
export const delZona = (data: {}, displayName: any) => ({
  type: types.delZona,
  payload: {
    data,
    displayName,
  },
});

/* export interface Zonas {
  results: data[];
} */
