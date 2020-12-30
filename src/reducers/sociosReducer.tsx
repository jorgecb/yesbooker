import {types} from '../types/types';

export const sociosReducer=(state:{}={},action:any)=>{
    switch (action.type) {
        case types.fetchSocios:
          /*   const listadoSocios: {} = () =>{
                let lista:{} = {};
                const url = 'http://reservasapi.yes-admin.com/index.php/Socios/';
                let myHeaders = new Headers();
                myHeaders.append("X-API-KEY", "709cd00931492fef092b3430b64389016fe7eb4f");
                myHeaders.append("Accept", "application/x-www-form-urlencoded");
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                let requestOptions: RequestInit = {
                    method: 'POST',
                    headers: myHeaders,
                  };        
                fetch(url,requestOptions).then(response => response.text())
                .then(result => {console.log(result)
                    lista = result;
                })
                .catch(error => console.log('error',error));
                console.log(lista);
                return lista;
            }
            return {data: listadoSocios, name:action.payload.displayName}; */
            console.log(typeof action.payload.data);
            return {data:action.payload.data, name:action.payload.displayName};
        case types.addSocio:
            return {data:action.payload.data, name:action.payload.displayName};
        case types.uptSocio:
            return {data:action.payload.data, name:action.payload.displayName};
        case types.delSocio:
            return {data:action.payload.data, name:action.payload.displayName};
        
        default:
            return state;
    }
}