import { types } from "../types/types";
/* import { data } from "./UserConst"; */
import BaseUrl from "../config";
import Clientesdb from "../database/Clientes";
/* import { HaderAccessGET, HaderAccessDELETE } from "./HaderAccess"; */

export const addCliente =(data:{}, displayName:any)=>({
    type: types.addCliente,
    payload:{ 
        data,
        displayName
    }
}); 
export const uptCliente =(data:{}, displayName:any)=>({
    type: types.uptCliente,
    payload:{
        data,
        displayName
    }
});
export const delCliente =(data:{}, displayName:any)=>({
    type: types.delCliente,
    payload:{
        data,
        displayName
    }
});

export const postClientes = (data: any, name:any) => {

  console.log(data);
   
  
    let user = JSON.parse(localStorage.getItem("UserCredenciales") || "{}");
    let initialState = user.tkn;
    let myHeaders = new Headers();
    myHeaders.append("tkn", initialState);
    myHeaders.append("Accept", "application/x-www-form-urlencoded");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
    let urlencoded = new URLSearchParams();
    urlencoded.append("nombre", data.Nombre);
    urlencoded.append("codigo_pais", data.CodigoPais);
    urlencoded.append("telefono", data.Telefono);
    urlencoded.append("correo_electronico", data.Email);
    urlencoded.append("idioma", data.Idioma);
    
  
    const HaderAccessPost: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
  return(dispatch:any) =>{

    fetch(BaseUrl.UrlApi + "clientes", HaderAccessPost).then((response) => {
      if (response.status === 200) {
        response.text().then((result)=> {
            dispatch(addCliente(JSON.parse(result),name)); 
            let resp: any = JSON.parse(result);
            console.log('lo mande al servidor');
            
        })
        
      } else {

        if(response.status === 400){
          console.log('lo mande local');

        }

          /* Clientesdb.add(data)

          console.log("lo mande local"); */
          
        /* userDb.add(data); */
      }
    });}
  };
  