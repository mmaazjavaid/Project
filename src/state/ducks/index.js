import { combineReducers } from "@reduxjs/toolkit";
import adsReducer from "./ads/adsSlice";
import { all } from "redux-saga/effects";
import watchAds from "./ads/adsSaga";
export const rootReducer = combineReducers({
    ads: adsReducer
})

export const rootSaga = function* rootSaga() {
    yield all([watchAds()]);
};