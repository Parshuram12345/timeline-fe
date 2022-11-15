import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import project from "./project";
import noPersist from "./noPersist";
import timelineReducer from './timelineReducer';
import addToCartReducer from "./cart";

const rootReducer = combineReducers({
  auth,
  settings,
  project,
  noPersist,
  timelineReducer,
  addToCartReducer,
});

export default rootReducer;
