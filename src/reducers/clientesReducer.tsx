import {types} from '../types/types';

export const clientesReducer=(state:{}={},action:any)=>{
    switch (action.type) {
        case types.addCliente:
            return {data:action.payload.data, name:action.payload.displayName};
        case types.uptCliente:
            return {data:action.payload.data, name:action.payload.displayName};
        case types.delCliente:
            return {data:action.payload.data, name:action.payload.displayName};
        
        default:
            return state;
    }
} 