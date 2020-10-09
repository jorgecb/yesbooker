import {types} from '../types/types';

export const sociosReducer=(state:{}={},action:any)=>{
    switch (action.type) {
        case types.addSocio:
            return {data:action.payload.data, name:action.payload.displayName}
    
        default:
            return state;
    }
}