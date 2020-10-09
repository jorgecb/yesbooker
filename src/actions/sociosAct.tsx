import { types } from '../types/types';

export const addSocio =(data:{}, displayName:any)=>({
    type: types.addSocio,
    payload:{
        data,
        displayName
    }
});