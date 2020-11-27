import { types } from '../types/types';
import { useEffect, useState } from 'react';
import { Service } from '../types/types';
import { data } from './UserConst';
import BaseUrl from '../config'


export const addUsuario = (data: {}, displayName: any) => ({
  type: types.addUsuario,
  payload: {
    data,
    displayName
  }
});



export interface Usuarios {
  results: data[];
}



export const usePostUsuariosService = () => {
  const [result, setResult] = useState<Service<Usuarios>>({

    status: 'Cargando....'


  });

  let user = JSON.parse(localStorage.getItem('UserCredenciales') || '{}');
  const initialState = user.tkn
  let myHeaders = new Headers();
  myHeaders.append("tkn", initialState);
  var requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
  };
  console.log(user.tkn)




  useEffect(() => {
    fetch(BaseUrl.UrlApi+'Usuario/index',requestOptions)
      .then(response => response.json())
      .then(response => setResult({ status: 'Cargado', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  return result;
};

/* export default usePostUsuariosService; */