
export const types = {
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


interface ServiceInit {
  status: 'init';
}
interface ServiceLoading {
  status: 'Cargando....';
}
interface ServiceLoaded<T> {
  status: 'Cargado';
  payload: T;
}
interface ServiceError {
  status: 'error';
  error: Error;
}
export type Service<T> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError;
