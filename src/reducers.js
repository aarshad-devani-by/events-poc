import { combineReducers } from "redux";

import dynamicReducer from "./dynamicReducer";
const reducers = combineReducers({
  dynamicData: dynamicReducer,
});

export default reducers;
