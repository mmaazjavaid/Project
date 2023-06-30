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

const conversationsSlice = createSlice({
  name: "Conversations",
  initialState,
  reducers: {
    getConversationsRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    getConversationsSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    },
    getConversationsFail: (state, action) => {
      return {
        ...state,
        loading: false,
      };
    },
    markConversationReadRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    markConversationReadSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
      };
    },
    markConversationReadFail: (state, action) => {
      return {
        ...state,
        loading: false,
      };
    },
    clearConversationsAlert: (state) => {
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
  getConversationsRequest,
  getConversationsSuccess,
  getConversationsFail,
  markConversationReadRequest,
  markConversationReadSuccess,
  markConversationReadFail,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
