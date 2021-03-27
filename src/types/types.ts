export const types = {
  addSucursal: "[Sucursales] Add",
  uptSucursal: "[Sucursales] Upt",
  delSucursal: "[Sucursales] Del",

  getRoles: "[Roles] List",

  getUsuarios: "[Usuarios] List",
  addUsuario: "[Usuarios] Add",
  uptUsuario: "[Usuarios] Upt",
  delUsuario: "[Usuarios] Del",
  
  fetchSocios: "[Socios] List",
  addSocio: "[Socios] Add",
  uptSocio: "[Socios] Upt",
  delSocio: "[Socios] Del",
};

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
