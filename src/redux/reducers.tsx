import { combineReducers } from "redux";
import auth from "./authStore";
import message from "./messaje";

export default combineReducers({
  auth,
  message,
});
