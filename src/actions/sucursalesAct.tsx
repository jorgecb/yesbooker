import { types } from '../types/types';

export const addSucursal =(data:{}, displayName:any)=>({
    type: types.addSucursal,
    payload:{
        data,
        displayName
    }
});