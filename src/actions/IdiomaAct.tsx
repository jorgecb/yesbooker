import { types } from "../types/types";
import BaseUrl from "../config";
import idioma from "../database/AcIdioma";
import { HaderAccessGET } from "./HaderAccess";


export const getIdiomas = (data: any, displayName: any) => {
  return (dispatch: any) => {
    fetch(BaseUrl.UrlApi + "idioma", HaderAccessGET).then((response) => {
      if (response.status === 200) {
        
        idioma.limTab();
        response.text().then((result) => {
          dispatch(fetchIdioma(JSON.parse(result), displayName));
          
          let algo: any = JSON.parse(result);
          
          algo.map((item: any, i: any) => {
           const setData = {
              idioma: item.idioma,
              inserver:1
              
            };
            idioma.add(setData); 
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

export const fetchIdioma = (data: {}, displayName: any) => ({
  type: types.getIdioma,
  payload: {
    data,
    displayName,
  },
});