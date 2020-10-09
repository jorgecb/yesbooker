import { alertConstants } from './errormessge';

type Action = { type: 'alert-success', message: string }
    | { type: 'alert-danger', message: string }
    



export function alert(state = {}, action: Action ) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: alertConstants.SUCCESS
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: alertConstants.SUCCESS
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}