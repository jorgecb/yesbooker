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



const usePostUsuariosService = () => {
  const [result, setResult] = useState<Service<Usuarios>>({
    
    status: 'Cargando....'


  });
  var requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  };

  useEffect(() => {
    fetch(BaseUrl.UrlApi + 'usuario/Usuario/197', requestOptions)
      .then(response => response.json())
      .then(response => setResult({ status: 'Cargado', payload: response }))
      .catch(error => setResult({ status: 'error', error }));

  }, []);
  return result;
};

export default usePostUsuariosService;