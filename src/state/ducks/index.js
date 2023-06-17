import { combineReducers } from "@reduxjs/toolkit";
import adsReducer from "./ads/adsSlice";
import userReducer from "./users/userSLice";
import proposalsReducer from "./proposals/proposalsSlice";
import { all } from "redux-saga/effects";
import watchAds from "./ads/adsSaga";
import watchUser from "./users/userSaga";
import watchProposals from "./proposals/proposalsSaga";

export const rootReducer = combineReducers({
  ads: adsReducer,
  user: userReducer,
  proposals: proposalsReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([watchAds(), watchUser(), watchProposals()]);
};
