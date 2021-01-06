import { types } from '../types/types';

export const addZona =(data:{}, displayName:any)=>({
    type: types.addZona,
    payload:{
        data,
        displayName
    }
});
export const uptZona =(data:{}, displayName:any)=>({
    type: types.uptZona,
    payload:{
        data,
        displayName
    }
});
export const delZona =(data:{}, displayName:any)=>({
    type: types.delZona,
    payload:{
        data,
        displayName
    }
});