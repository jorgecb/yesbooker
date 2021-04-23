import { types } from '../types/types';

export const ZonasReducer = (state: {} = {}, action: any) => {

    switch (action.type) {
        case types.AgregarZona:
            return { data: action.payload.data, name: action.payload.displayName };

        default:
            return state;
    }
}