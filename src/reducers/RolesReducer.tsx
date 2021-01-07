import { types } from "../types/types";

export const getRoles = (state: {} = {}, action: any) => {
  switch (action.type) {
    case types.getRoles:
      console.log(action.payload.data);
      return { data: action.payload.data, name: action.payload.displayName };

    default:
      return state;
  }
};
