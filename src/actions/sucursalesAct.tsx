import { types } from '../types/types';
export const fetchSucursales = (data:any, displayName:any) => {
    /*     */
    return (dispatch:any) => {
        const url = 'http://reservasapi.yes-admin.com/index.php/sucursales/todos';
        const ren: any = window.localStorage.getItem('UserCredenciales');
        let user = JSON.parse(ren);
        console.log(user.tkn);
        let myHeaders = new Headers();
        myHeaders.append("X-API-KEY", "709cd00931492fef092b3430b64389016fe7eb4f");
        myHeaders.append("Accept", "application/x-www-form-urlencoded");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("tkn", user.tkn);
        let requestOptions: RequestInit = {
            method: 'get',
            headers: myHeaders,
            redirect: 'follow'
        };        
        fetch(url,requestOptions).then(response => response.text())
        .then(result => {
            /* JSON.parse(lista.toString());
                */console.log(typeof result, result);
            dispatch( listSucursales(JSON.parse(result), displayName));
        })
        .catch(error => console.log('error',error));/* 
        console.log(lista);
        setTimeout(()=>{
            dispatch( fetchSocios(lista, 'List'));
        },3500); */
    }    
}
export const listSucursales = (data:{}, displayName:any) =>({
    type: types.fetchSucursales,
    payload: {
        data,
        displayName
    }
});
export const addSucursal =(data:{}, displayName:any)=>({
    type: types.addSucursal,
    payload:{
        data,
        displayName
    }
});
export const uptSucursal =(data:{}, displayName:any)=>({
    type: types.uptSucursal,
    payload:{
        data,
        displayName
    }
});
export const delSucursal =(data:{}, displayName:any)=>({
    type: types.delSucursal,
    payload:{
        data,
        displayName
    }
});