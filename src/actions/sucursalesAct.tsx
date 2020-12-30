import { types } from '../types/types';

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