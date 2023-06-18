import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  contracts: [],
  currentProposal: {},
  loading: false,
  alert: {
    isOpen: false,
    message: null,
    severity: "success",
  },
};

const proposalSlice = createSlice({
  name: "Proposals",
  initialState,
  reducers: {
    getProposalsRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    getProposalsSuccess: (state, action) => {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    },
    getProposalsFail: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Error occured while fething proposals",
          severity: "error",
        },
      };
    },
    createProposalRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    createProposalSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Proposal submitted successfully",
          severity: "success",
        },
      };
    },
    createProposalFail: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Error occured while submitting Proposal",
          severity: "error",
        },
      };
    },
    hireProposalRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    hireProposalSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Proposal Hired Succesfully",
          severity: "success",
        },
      };
    },
    hireProposalFail: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Error occured while hiring Proposal",
          severity: "error",
        },
      };
    },
    terminateProposalRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    terminateProposalSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Contract Terminated Succesfully",
          severity: "success",
        },
      };
    },
    terminateProposalFail: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Error occured while terminating Proposal",
          severity: "error",
        },
      };
    },
    setCurrentProposalRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    setCurrentProposalSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        currentProposal: action.payload,
      };
    },
    setCurrentProposalFail: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Failed to load Proposal",
          severity: "error",
        },
      };
    },
    getContractsRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    getContractsSuccess: (state, action) => {
      return {
        ...state,
        contracts: action.payload,
        loading: false,
      };
    },
    getContractsFail: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Failed to get contracts",
          severity: "error",
        },
      };
    },
    updateProposalRequest: () => {},
    updateProposalSuccess: () => {},
    updateProposalFail: () => {},
    deleteProposalRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    deleteProposalSuccess: (state, action) => {
      return {
        ...state,
        data: state.data.filter((ad) => ad._id !== action.payload),
        loading: false,
        alert: {
          isOpen: true,
          message: "Proposal deleted successfully",
          severity: "warning",
        },
      };
    },
    deleteProposalFail: (state, action) => {
      return {
        ...state,
        loading: false,
        alert: {
          isOpen: true,
          message: "Error occured while deleting Proposal",
          severity: "error",
        },
      };
    },
    clearProposalsAlert: (state) => {
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
  getProposalsRequest,
  getProposalsSuccess,
  getProposalsFail,
  createProposalRequest,
  createProposalSuccess,
  createProposalFail,
  hireProposalRequest,
  hireProposalSuccess,
  hireProposalFail,
  terminateProposalRequest,
  terminateProposalSuccess,
  terminateProposalFail,
  setCurrentProposalRequest,
  setCurrentProposalSuccess,
  setCurrentProposalFail,
  getContractsRequest,
  getContractsSuccess,
  getContractsFail,
  updateProposalRequest,
  updateProposalSuccess,
  updateProposalFail,
  deleteProposalRequest,
  deleteProposalSuccess,
  deleteProposalFail,
  clearProposalsAlert,
} = proposalSlice.actions;

export default proposalSlice.reducer;
