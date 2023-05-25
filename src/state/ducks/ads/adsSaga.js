import { takeEvery, put, call, takeLatest } from "redux-saga/effects";
import {
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
    deleteAdFail
} from "./adsSlice";
import { apiCallRequest } from "../../utils/apiCaller";

function* getUserAdsSaga(action) {
    try {
        const data = yield call(apiCallRequest, `/api/show-user-ads/${localStorage.getItem("user_id")}`, "GET");
        yield put(getAdsSuccess(data));
    } catch (error) {
        yield put(getAdsFail());
    }
}

function* getAdsSaga(action) {
    try {
        const data = yield call(apiCallRequest, "/api/show-all-Ads", "GET");
        yield put(getAdsSuccess(data));
    } catch (error) {
        yield put(getAdsFail());
    }
}

function* getAdSaga(action) {
    try {
        const data = (yield call(
            apiCallRequest,
            "/todos/",
            "GET"
        ));
        yield put(getAdSuccess(data));
    } catch (error) {
        yield put(getAdFail());
    }
}

function* createAdSaga(action) {
    try {
        const res = (yield call(apiCallRequest, "/todos/", "POST", {
            title: action.payload.title,
            completed: action.payload.completed,
        }));
        yield put(createAdSuccess(res));
    } catch (error) {
        yield put(createAdFail());
    }
}

function* updateAdSaga(action) {
    try {
        yield call(apiCallRequest, "/todos/" + action.payload._id, "PUT", {
            title: action.payload.title,
            completed: action.payload.completed,
        });
        yield put(updateAdSuccess(action.payload));
    } catch (error) {
        yield put(updateAdFail());
    }
}

function* deleteAdSaga(action) {
    try {
        yield call(apiCallRequest, "/todos/" + action.payload, "DELETE");
        yield put(deleteAdSuccess(action.payload));
    } catch (error) {
        yield put(deleteAdFail());
    }
}

function* watchAds() {
    yield takeEvery(getUserAdsRequest, getUserAdsSaga);
    yield takeEvery(getAdsRequest, getAdsSaga);
    yield takeLatest(getAdRequest, getAdSaga);
    yield takeEvery(createAdRequest, createAdSaga);
    yield takeEvery(updateAdRequest, updateAdSaga);
    yield takeEvery(deleteAdRequest, deleteAdSaga);
}

export default watchAds;
