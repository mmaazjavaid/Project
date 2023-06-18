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
  setCurrentAdRequest,
  setCurrentAdSuccess,
  setCurrentAdFail,
  updateAdRequest,
  updateAdSuccess,
  updateAdFail,
  deleteAdRequest,
  deleteAdSuccess,
  deleteAdFail,
} from "./adsSlice";
import { apiCallRequest } from "../../utils/apiCaller";

function* getUserAdsSaga(action) {
  try {
    const data = yield call(
      apiCallRequest,
      `/api/show-user-ads/${localStorage.getItem("user_id")}`,
      "GET"
    );
    yield put(getAdsSuccess(data));
  } catch (error) {
    yield put(getAdsFail());
  }
}

function* getAdsSaga(action) {
  try {
    const data = yield call(apiCallRequest, `/api/show-all-Ads/${action.payload}`, "GET");
    yield put(getAdsSuccess(data));
  } catch (error) {
    yield put(getAdsFail());
  }
}

function* getAdSaga(action) {
  try {
    const data = yield call(apiCallRequest, "/todos/", "GET");
    yield put(getAdSuccess(data));
  } catch (error) {
    yield put(getAdFail());
  }
}

function* createAdSaga(action) {
  try {
    yield call(apiCallRequest, "/api/create-Ad", "POST", action.payload, false);
    yield put(createAdSuccess());
  } catch (error) {
    yield put(createAdFail());
  }
}

function* setCurrentAdSaga(action) {
  try {
    yield put(setCurrentAdSuccess(action.payload));
  } catch (error) {
    yield put(setCurrentAdFail());
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
    yield call(apiCallRequest, `/api/Delete-Ad/${action.payload}`, "DELETE");
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
  yield takeEvery(setCurrentAdRequest, setCurrentAdSaga);
  yield takeEvery(updateAdRequest, updateAdSaga);
  yield takeEvery(deleteAdRequest, deleteAdSaga);
}

export default watchAds;
