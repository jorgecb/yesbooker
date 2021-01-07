import { types } from "../types/types";
import { useEffect, useState } from "react";
import { Service } from "../types/types";
import { data } from "./UserConst";
import BaseUrl from "../config";




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
   results: data[];
   
}
