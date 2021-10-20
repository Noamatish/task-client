import { combineReducers } from "redux";
import emailSlice from "../slices/emailSlice";
import authSlice from "../slices/authSlice";
export default combineReducers({
  emailSlice,
  authSlice,
});
