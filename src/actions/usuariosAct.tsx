import { types } from "../types/types";
import { useEffect, useState } from "react";
import { Service } from "../types/types";
import { data } from "./UserConst";
import BaseUrl from "../config";
import Dexie from "dexie";

const db = new Dexie("Roles");
db.version(1).stores({
  Rol: "++Id, Roles",
});
db.open().catch((err) => {
  console.log(err);
});

const tableName = "Rol";
export const usePostUsuariosService = async () => {
  const [result, setResult] = useState<Service<Usuarios>>({
    status: "Cargando....",
  });

  let user = JSON.parse(localStorage.getItem("UserCredenciales") || "{}");
  const initialState = user.tkn;
  let myHeaders = new Headers();
  myHeaders.append("tkn", initialState);
  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
  };

  console.log(result);
  const insert = { Id: 4, Roles: "adminasjasjjsdhsjh" };
  useEffect(
    () => {
      fetch(BaseUrl.UrlApi + "Usuario/roles", requestOptions).then(
        (response) => {
          if (response.status != 200) {
            if (response.status != 201) {
              /*    dispatch({
            type: "loginFailed",
            payload: "Contraseña o Email Error",
          }); */
              console.log("eror");
              return;
            }
            response.json().then((data) => {
              console.log(data.data[0].Roles);
              const insert = { Id: data.data[0].Id, Roles: data.data[0].Roles };
              console.log(insert);
              db.table(tableName).add(insert);
            });
            return;
          } else {
            response.json().then((data) => {
              console.log(data.data[0].Roles);
              const insert = { Id: data.data[0].Id, Roles: data.data[0].Roles };
              console.log(insert);
              db.table(tableName).add(insert);
            });
          }
        }
      );
    }

    //create the database store

    /*  (async () => {
    const db = new Dexie("Roles");
    db.version(1).stores({
      Rol: "++Id, Roles",
    });
    db.open().catch((err) => {
      console.log(err);
    });
    const tableName = "Rol";

    console.log(result);
    const insert_object = { Roles: "admin" };
    console.log(insert_object);
    db.table(tableName).add(insert_object);
  })(); */

    /* 
  let rolesGet = {
    Id: "1",
    Roles: "admin",
  };

  db.table(tableName).add(rolesGet);
  console.log(result); */
  );
  return result;
};

export const GetUsuarios = (data: {}, displayName: any) => ({
  type: types.fetchSocios,
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
  /*   results: data[];
   */
}
