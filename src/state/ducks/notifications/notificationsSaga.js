import { takeEvery, put, call } from "redux-saga/effects";
import { apiCallRequest } from "../../utils/apiCaller";
import {
  getNotificationsRequest,
  getNotificationsSuccess,
  getNotificationsFail,
  createNotificationRequest,
  createNotificationSuccess,
  createNotificationFail,
  updateNotificationRequest,
  updateNotificationSuccess,
  updateNotificationFail,
} from "./notificationsSlice";

function* createNotificationSaga(action) {
  try {
    yield call(apiCallRequest, `/api/create-notification`, "POST", action.payload);
    yield put(createNotificationSuccess());
  } catch (error) {
    yield put(createNotificationFail());
  }
}

function* updateNotificationSaga(action) {
  try {
    yield call(
      apiCallRequest,
      `/api/read-notification/${localStorage.getItem("user_id")}`,
      "POST",
      action.payload
    );
    yield put(updateNotificationSuccess());
  } catch (error) {
    yield put(updateNotificationFail());
  }
}

function* getNotificationsSaga(action) {
  try {
    const data = yield call(apiCallRequest, `/api/get-user-notfications/${action.payload}`, "GET");
    yield put(getNotificationsSuccess(data));
  } catch (error) {
    yield put(getNotificationsFail());
  }
}

function* watchNotifications() {
  yield takeEvery(getNotificationsRequest, getNotificationsSaga);
  yield takeEvery(createNotificationRequest, createNotificationSaga);
  yield takeEvery(updateNotificationRequest, updateNotificationSaga);
}

export default watchNotifications;
