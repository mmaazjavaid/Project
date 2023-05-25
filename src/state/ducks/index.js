import { combineReducers } from "@reduxjs/toolkit";
import adsReducer from "./ads/adsSlice";
import userReducer from './users/userSLice'
import { all } from "redux-saga/effects";
import watchAds from "./ads/adsSaga";
import watchUser from "./users/userSaga";
export const rootReducer = combineReducers({
    ads: adsReducer,
    user: userReducer
})

export const rootSaga = function* rootSaga() {
    yield all([watchAds(),watchUser()]);
};