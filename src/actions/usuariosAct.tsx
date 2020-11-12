import { types } from '../types/types';

export const addUsuario =(data:{}, displayName:any)=>({
    type: types.addUsuario,
    payload:{
        data,
        displayName
    }
});
export const uptUsuario =(data:{}, displayName:any)=>({
    type: types.uptUsuario,
    payload:{
        data,
        displayName
    }
});
export const delUsuario =(data:{}, displayName:any)=>({
    type: types.delUsuario,
    payload:{
        data,
        displayName
    }
});