import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { authApi } from "./api/authApi";
import { teamApi } from "./api/teamApi";
import { documentApi } from "./api/documentApi";
import { versionApi } from "./api/VersionApi";
import { suggestionApi } from "./api/suggestionApi";
import { feedbackApi } from "./api/feedbackApi";
const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [teamApi.reducerPath]: teamApi.reducer,
  [documentApi.reducerPath]: documentApi.reducer,
  [versionApi.reducerPath]: versionApi.reducer,
  [suggestionApi.reducerPath]: suggestionApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
});

export default rootReducer;
