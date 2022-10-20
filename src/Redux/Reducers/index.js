import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import project from "./project";
import noPersist from "./noPersist";
import timelineReducer from './timelineReducer';

const rootReducer = combineReducers({
  auth,
  settings,
  project,
  noPersist,
  timelineReducer,
});

export default rootReducer;
