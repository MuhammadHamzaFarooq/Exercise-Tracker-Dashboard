import { createSlice } from "@reduxjs/toolkit";
import { signupApi, loginApi } from "./authApi";
import { setAuthToken } from "../../api/api";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupStart(state) {
      state.loading = true;
    },
    signupSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      setAuthToken(action.payload.token);
    },
    signupFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      setAuthToken(action.payload.token);
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
      setAuthToken(null);
    },
  },
});

export const {
  signupStart,
  signupSuccess,
  signupFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(signupStart());
    const response = await signupApi(userData);
    dispatch(signupSuccess(response));
  } catch (error) {
    dispatch(signupFailure(error.message));
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await loginApi(userData);
    dispatch(loginSuccess(response));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export default authSlice.reducer;
