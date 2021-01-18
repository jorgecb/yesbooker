import {types} from '../types/types';

export const mesasReducer=(state:{}={},action:any)=>{
    switch (action.type) {

        case types.fetchMesas:
            console.log(typeof action.payload.data);
            return {data:action.payload.data, name:action.payload.displayName};
        case types.addMesa:
            return {data:action.payload.data, name:action.payload.displayName};
        case types.uptMesa:
            return {data:action.payload.data, name:action.payload.displayName};   
        case types.delMesa:
            return {data:action.payload.data, name:action.payload.displayName};
        
        default:
            return state;
    }
}