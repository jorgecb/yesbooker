import { types } from "../types/types";
import BaseUrl from "../config";
import codigo from "../database/AcCodigo";
import { HaderAccessGET } from "./HaderAccess";


export const getCodigos = (data: any, displayName: any) => {
  return (dispatch: any) => {
    fetch(BaseUrl.UrlApi + "codigo", HaderAccessGET).then((response) => {
      if (response.status === 200) {
        codigo.limTab();
        response.text().then((result) => {
          dispatch(fetchCodigo(JSON.parse(result), displayName));




          let algo: any = JSON.parse(result);
          
          algo.map((item: any, i: any) => {
           const setData = {
              codigo: item.codigo,
              pais: item.pais,
              inserver:1
              
            };
            codigo.add(setData); 
        });
        
        return;
        })
      } else {
        console.log(response.status);
        response.text().catch((error) => console.log("error", error));
        return;
      }
    });
  };
};

export const fetchCodigo = (data: {}, displayName: any) => ({
  type: types.getCodigo,
  payload: {
    data,
    displayName,
  },
});