interface ServiceInit {
    status: 'init';
  }
  
  interface ServiceLoading {
    status: 'loading';
  }
  
  interface ServiceLoaded<T> {
    status: 'loaded';
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
  

  export interface Starship {
      nombre: string;
     /*  crew: string;
      passengers: string;
      cost_in_credits?: string;
      url: 'http://localhost/reservas4/public/usuario/list'; */
    }
    