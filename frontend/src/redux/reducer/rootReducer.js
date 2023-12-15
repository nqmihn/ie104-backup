import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";
import configReducer from "./configReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  config: configReducer,
});

export default rootReducer;
