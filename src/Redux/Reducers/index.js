import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import project from "./project";
import addToCartReducer from "../../Lms/Reducers/reducer";
import threedReducer from "../../Lms/Reducers/threedReducer";
import noPersist from "./noPersist";
import lmsReducer from "../../Lms/Reducers/lmsReducer";

const rootReducer = combineReducers({
  auth,
  settings,
  project,
  addToCartReducer,
  threedReducer,
  noPersist,
  lmsReducer,
});

export default rootReducer;
