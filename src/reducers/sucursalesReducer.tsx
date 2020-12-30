import {types} from '../types/types';

export const sucursalesReducer=(state:{}={},action:any)=>{
    switch (action.type) {

        case types.fetchSucursales:
            console.log(typeof action.payload.data);
            return {data:action.payload.data, name:action.payload.displayName};
        case types.addSucursal:
            return {data:action.payload.data, name:action.payload.displayName};
        case types.uptSucursal:
            return {data:action.payload.data, name:action.payload.displayName};   
        case types.delSucursal:
            return {data:action.payload.data, name:action.payload.displayName};
        
        default:
            return state;
    }
}