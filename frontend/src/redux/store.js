import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice";

import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";
import { doctorApi } from "./api/doctorApi";
import { appointmentApi } from "./api/appointmentApi";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      doctorApi.middleware,
      appointmentApi.middleware,
    ]),
});
