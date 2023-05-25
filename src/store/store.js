// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import activityReducer from "../features/activity/activitySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    activity: activityReducer,
  },
});

export default store;
