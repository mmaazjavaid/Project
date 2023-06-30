import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  alert: {
    isOpen: false,
    message: null,
    severity: "success",
  },
};

const notificationsSlice = createSlice({
  name: "Notifications",
  initialState,
  reducers: {
    getNotificationsRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    getNotificationsSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    },
    getNotificationsFail: (state, action) => {
      return {
        ...state,
        loading: false,
      };
    },
    createNotificationRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    createNotificationSuccess: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    createNotificationFail: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    updateNotificationRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    updateNotificationSuccess: (state) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Notification marked as read",
          severity: "success",
        },
      };
    },
    updateNotificationFail: (state) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Failed to update notification",
          severity: "error",
        },
      };
    },
    clearNotificationsAlert: (state) => {
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
  getNotificationsRequest,
  getNotificationsSuccess,
  getNotificationsFail,
  createNotificationRequest,
  createNotificationSuccess,
  createNotificationFail,
  updateNotificationRequest,
  updateNotificationSuccess,
  updateNotificationFail,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
