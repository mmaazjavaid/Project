import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  currentAd: {},
  loading: false,
  alert: {
    isOpen: false,
    message: null,
    severity: "success",
  },
};

const adSlice = createSlice({
  name: "Ads",
  initialState,
  reducers: {
    getUserAdsRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    getAdsRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    getAdsSuccess: (state, action) => {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    },
    getAdsFail: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Error occured while fething ads",
          severity: "error",
        },
      };
    },
    getAdRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    getAdSuccess: (state, action) => {
      return {
        ...state,
        currentAd: action.payload,
        loading: false,
      };
    },
    getAdFail: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Error occured while fething ad",
          severity: "error",
        },
      };
    },
    createAdRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    createAdSuccess: (state, action) => {
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
        alert: {
          isOpen: true,
          message: "Ad created successfully",
          severity: "success",
        },
      };
    },
    createAdFail: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Error occured while creating Ad",
          severity: "error",
        },
      };
    },
    updateAdRequest: () => {},
    updateAdSuccess: () => {},
    updateAdFail: () => {},
    deleteAdRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    deleteAdSuccess: (state, action) => {
      return {
        ...state,
        data: state.data.filter((ad) => ad.id !== action.payload),
        loading: false,
        alert: {
          isOpen: true,
          message: "Ad deleted successfully",
          severity: "warning",
        },
      };
    },
    deleteAdFail: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Error occured while deleting ad",
          severity: "error",
        },
      };
    },
  },
});

export const {
  getUserAdsRequest,
  getAdsRequest,
  getAdsSuccess,
  getAdsFail,
  getAdRequest,
  getAdSuccess,
  getAdFail,
  createAdRequest,
  createAdSuccess,
  createAdFail,
  updateAdRequest,
  updateAdSuccess,
  updateAdFail,
  deleteAdRequest,
  deleteAdSuccess,
  deleteAdFail,
} = adSlice.actions;

export default adSlice.reducer;
