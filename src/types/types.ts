
export const types ={
    addSucursal : '[Sucursales] Add',
    addUsuario: '[Usuarios] Add',
    addSocio: '[Socios] Add',
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