import { combineReducers } from "@reduxjs/toolkit";
import adsReducer from "./ads/adsSlice";
import userReducer from "./users/userSLice";
import proposalsReducer from "./proposals/proposalsSlice";
import notificationsReducer from "./notifications/notificationsSlice";

import { all } from "redux-saga/effects";
import watchAds from "./ads/adsSaga";
import watchUser from "./users/userSaga";
import watchProposals from "./proposals/proposalsSaga";
import watchNotifications from "./notifications/notificationsSaga";

export const rootReducer = combineReducers({
  ads: adsReducer,
  user: userReducer,
  proposals: proposalsReducer,
  notifications: notificationsReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([watchAds(), watchUser(), watchProposals(), watchNotifications()]);
};
