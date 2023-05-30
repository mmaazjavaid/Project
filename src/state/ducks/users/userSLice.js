import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  isAuth: localStorage.getItem("token") ? true : false,
  alert: {
    isOpen: false,
    message: null,
    severity: "success",
  },
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    loginSuccess: (state, action) => {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    },
    loginFail: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Failed o login please retry",
          severity: "error",
        },
      };
    },
    getUserRequest: (state, action) => {
      return {
        ...state,
      };
    },
    getUserSuccess: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    getUserFail: (state, action) => {
      return {
        ...state,
      };
    },
    registerRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    registerSuccess: (state) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Account created successfully. Proceed to login",
          severity: "success",
        },
      };
    },
    registerFail: (state) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Failed to register please retry",
          severity: "error",
        },
      };
    },
    logoutRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    logoutSuccess: () => {
      return {
        ...initialState,
      };
    },
    logoutFail: (state) => {
      return {
        ...state,
        loading: true,
        alert: {
          isOpen: true,
          message: "Logout Failed please try again",
          severity: "error",
        },
      };
    },
    clearUserAlert: (state) => {
      return {
        ...state,
        alert: {
          ...state.alert,
          isOpen: false,
        },
      };
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  getUserRequest,
  getUserSuccess,
  getUserFail,
  registerRequest,
  registerSuccess,
  registerFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  clearUserAlert,
} = userSlice.actions;

export default userSlice.reducer;
