import { types } from '../types/types';

export const addSocio =(data:{}, displayName:any)=>({
    type: types.addSocio,
    payload:{
        data,
        displayName
    }
});
export const uptSocio =(data:{}, displayName:any)=>({
    type: types.uptSocio,
    payload:{
        data,
        displayName
    }
});
export const delSocio =(data:{}, displayName:any)=>({
    type: types.delSocio,
    payload:{
        data,
        displayName
    }
});