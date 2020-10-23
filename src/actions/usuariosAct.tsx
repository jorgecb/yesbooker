import { types } from '../types/types';

export const addUsuario =(data:{}, displayName:any)=>({
    type: types.addUsuario,
    payload:{
        data,
        displayName
    }
});