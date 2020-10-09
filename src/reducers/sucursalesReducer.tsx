import {types} from '../types/types';

export const sucursalesReducer=(state:{}={},action:any)=>{
    switch (action.type) {
        case types.addSucursal:
            return {data:action.payload.data, name:action.payload.diplayName}
    
        default:
            return state;
    }
}