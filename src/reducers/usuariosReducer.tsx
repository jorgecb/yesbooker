import {types} from '../types/types';

export const usuariosReducer=(state:{}={},action:any)=>{
    switch (action.type) {
        case types.addUsuario:
            return {data:action.payload.data, name:action.payload.displayName};
        case types.uptUsuario:
            return {data:action.payload.data, name:action.payload.displayName};
        case types.delUsuario:
            return {data:action.payload.data, name:action.payload.displayName};
    
        default:
            return state;
    }
}