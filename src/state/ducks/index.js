import { combineReducers } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";
import adsReducer from "./ads/adsSlice";
import userReducer from "./users/userSLice";
import proposalsReducer from "./proposals/proposalsSlice";
import notificationsReducer from "./notifications/notificationsSlice";
import conversationsReducer from "./conversations/conversationsSlice";

import watchAds from "./ads/adsSaga";
import watchUser from "./users/userSaga";
import watchProposals from "./proposals/proposalsSaga";
import watchNotifications from "./notifications/notificationsSaga";
import watchConversations from "./conversations/conversationsSaga";

export const rootReducer = combineReducers({
  ads: adsReducer,
  user: userReducer,
  proposals: proposalsReducer,
  notifications: notificationsReducer,
  conversations: conversationsReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([
    watchAds(),
    watchUser(),
    watchProposals(),
    watchNotifications(),
    watchConversations(),
  ]);
};
