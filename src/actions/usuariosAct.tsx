import { types } from "../types/types";
import { data } from "./UserConst";
import BaseUrl from "../config";
import userDb from "../database/Usuarios";
import { HaderAccessGET, HaderAccessDELETE } from "./HaderAccess";

export const getUsuarios = (data: any, displayName: any) => {
  return (dispatch: any) => {
    userDb.search().then((dev) => {
      if (dev === true) {
        postUsuarios(dev[0]);
        console.log(dev[0]);
      } else {
        console.log(dev[0]);
      }
    });
    fetch(BaseUrl.UrlApi + "Usuario/index", HaderAccessGET).then((response) => {
      if (response.status === 200) {
        /*      userDb.limTab(); */
        response.text().then((result) => {
          dispatch(GetUsuarios(JSON.parse(result), displayName));

          let algo: any = JSON.parse(result);
          algo.data.map((item: any, i: any) => {
            const setData = {
              apellido: item.apellido,
              email: item.email,
              fechaConexion: item.fechaConexion,
              fechaCreacion: item.fechaCreacion,
              fechaModifica: item.fechaModifica,
              id: item.id,
              imageProfile: item.imageProfile,
              nombre: item.nombre,
              rol: item.rol,
              status: item.status,
              telefono: item.telefono,
              deleted: false,
              inserver: true,
            };
            userDb.add(setData);
          });
        });
        return;
      } else {
        /*         console.log(response.status);
         */ response.text().catch((error) => console.log("error", error));

        return;
      }
    });
  };
};
export const postUsuarios = (data: any) => {
  console.log(data);

  let user = JSON.parse(localStorage.getItem("UserCredenciales") || "{}");
  let initialState = user.tkn;
  let myHeaders = new Headers();
  myHeaders.append("tkn", initialState);
  myHeaders.append("Accept", "application/x-www-form-urlencoded");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let urlencoded = new URLSearchParams();
  console.log(data);
  urlencoded.append("imageProfile", data.imageProfile);
  urlencoded.append("rol", data.rol);
  urlencoded.append("password", data.password);
  urlencoded.append("passwordConfirma", data.passwordConfirma);
  urlencoded.append("nombre", data.nombre);
  urlencoded.append("apellido", data.apellido);
  urlencoded.append("telefono", data.telefono);
  urlencoded.append("email", data.email);

  const HaderAccessPost: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch(BaseUrl.UrlApi + "Usuario/post", HaderAccessPost).then((response) => {
    console.log(response.status);
    if (response.status === 200) {
      addUsuario(addUsuario, "Add");
      console.log(response);
      return;
    } else {
      console.log(response);
      userDb.add(data);
    }
  });
};

export const putUsuarios = (id: any, data: any) => {
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

export const deltedUsuarios = (id: any) => {
  console.log(id);

  fetch(BaseUrl.UrlApi + "Usuario/delete/" + id, HaderAccessDELETE).then(
    (response) => {
      console.log(response.status);
      if (response.status === 200) {
        delUsuario(delUsuario, "Del");
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

export const GetUsuarios = (data: {}, displayName: any) => ({
  type: types.getUsuarios,
  payload: {
    data,
    displayName,
  },
});

export const addUsuario = (data: {}, displayName: any) => ({
  type: types.addUsuario,
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
export const delUsuario = (data: {}, displayName: any) => ({
  type: types.delUsuario,
  payload: {
    data,
    displayName,
  },
});

export interface Usuarios {
  results: data[];
}
