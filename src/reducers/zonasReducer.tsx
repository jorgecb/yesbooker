import {types} from '../types/types';

export const zonasReducer=(state:{}={},action:any)=>{
    switch (action.type) {
        case types.addZona:
            return {data:action.payload.data, name:action.payload.displayName};
        case types.uptZona:
            return {data:action.payload.data, name:action.payload.displayName};
        case types.delZona:
            return {data:action.payload.data, name:action.payload.displayName};
    
        default:
            return state;
    }
}