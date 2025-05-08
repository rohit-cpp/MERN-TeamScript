import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import rootReducer from "./rootReducer";
import { authApi } from "./api/authApi";
import { teamApi } from "./api/teamApi";
import { documentApi } from "./api/documentApi";
const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authApi.middleware,
      teamApi.middleware,
      documentApi.middleware
    ),
});
export default store;

// const initializeApp = async () => {
//   await appStore.dispatch(
//     authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
//   );
// };
// initializeApp();
