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
    console.log("SignUp API Response", response);
    if (response.status === 200 && response.data?.success === true) {
      dispatch(signupSuccess(response.data));
      return response; // Return the server response
    } else {
      const errorMessage =
        response.data?.message || "Signup Failed. Please try again.";
      console.log(errorMessage);
      dispatch(signupFailure(errorMessage));
      return response; // Return the server response with error status
    }
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data?.message || "Signup Failed. Please try again.";
    dispatch(signupFailure(errorMessage));
    throw new Error(errorMessage); // Throw an error to be caught in the catch block
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await loginApi(userData);
    if (response.status === 200 && response.data?.success === true) {
      dispatch(loginSuccess(response.data));
      return response; // Return the server response
    } else {
      const errorMessage =
        response.data?.message || "Signup Failed. Please try again.";
      console.log(errorMessage);
      dispatch(loginFailure(errorMessage));
      return response; // Return the server response with error status
    }
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data?.message || "Signup Failed. Please try again.";
    dispatch(loginFailure(errorMessage));
    throw new Error(errorMessage);
  }
};

export default authSlice.reducer;
