import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import rootReducer from "./rootReducer";
import { authApi } from "./api/authApi";
const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware),
});
export default store;
