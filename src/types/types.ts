export const types = {
  login: "[Login] loginSuccess",
  AgregarZona: "[addZona] add",
  LOGOUT: "[LOGOUT] LOGOUT",
  getZonas: "[getZonas] List",
  getRoles: "[Roles] List",
  delZona: "[Zona] Del",
  fetchSucursales: '[Sucursales] List',
  addSucursal: '[Sucursales] Add',
  uptSucursal: '[Sucursales] Upt',
  delSucursal: '[Sucursales] Del',
  getUsuarios: '[Usuarios] List',
  addUsuario: '[Usuarios] Add',
  uptUsuario: '[Usuarios] Upt',
  delUsuario: '[Usuarios] Add',
  fetchSocios: '[Socios] List',
  addSocio: '[Socios] Add',
  uptSocio: '[Socios] Upt',
  delSocio: '[Socios] Del',
  fetchMesas: '[Mesas] List',
  addMesa: '[Mesas] Add',
  uptMesa: '[Mesas] Upt',
  delMesa: '[Mesas] Del',
  addCliente:'[Clientes] Add',
  uptCliente:'[Clientes] Upt',
  delCliente:'[Clientes] Del',
}


export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";




interface ServiceInit {
  status: "init";
}
interface ServiceLoading {
  status: "Cargando....";
}
interface ServiceLoaded<T> {
  status: "Cargado";
  payload: T;
}
interface ServiceError {
  status: "error";
  error: Error;
}
export type Service<T> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError;
