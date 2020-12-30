import { types } from '../types/types';

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