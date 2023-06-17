import { takeEvery, put, call } from "redux-saga/effects";
import { apiCallRequest } from "../../utils/apiCaller";
import {
  loginFail,
  loginRequest,
  loginSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
  updateRequest,
  updateSuccess,
  updateFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  getUserSuccess,
  getUserFail,
  getUserRequest,
} from "./userSLice";

function* userLoginSaga(action) {
  try {
    const data = yield call(apiCallRequest, `/api/login-User`, "POST", action.payload);
    localStorage.setItem("user_id", data.user_id);
    if (data.user) yield put(loginSuccess(data.user));
    else throw new Error("user not found");
  } catch (error) {
    yield put(loginFail());
  }
}

function* userRegisterSaga(action) {
  try {
    const res = yield call(apiCallRequest, `/api/signup-User`, "POST", action.payload);
    if (!res?.user) throw new Error(res?.error);
    yield put(registerSuccess());
  } catch (error) {
    yield put(registerFail());
  }
}

function* userUpdateSaga(action) {
  try {
    const res = yield call(
      apiCallRequest,
      `/api/Edit-User/${localStorage.getItem("user_id")}`,
      "PATCH",
      action.payload
    );
    if (!res?.user) throw new Error(res?.error);
    yield put(updateSuccess(res.sp));
  } catch (error) {
    yield put(updateFail());
  }
}

function* userLogoutSaga(action) {
  try {
    localStorage.clear();
    yield put(logoutSuccess());
    window.location.href = "/";
  } catch (error) {
    yield put(logoutFail());
  }
}

function* getUserSaga(action) {
  try {
    if (localStorage.getItem("user_id")) {
      const data = yield call(
        apiCallRequest,
        `/api/get-User/${localStorage.getItem("user_id")}`,
        "GET"
      );
      if (data.user) yield put(getUserSuccess(data.user));
      else throw new Error("User not exist in Session");
    } else {
      throw new Error("User not exist in Session");
    }
  } catch (error) {
    yield put(getUserFail());
  }
}

function* watchUser() {
  yield takeEvery(loginRequest, userLoginSaga);
  yield takeEvery(getUserRequest, getUserSaga);
  yield takeEvery(registerRequest, userRegisterSaga);
  yield takeEvery(updateRequest, userUpdateSaga);
  yield takeEvery(logoutRequest, userLogoutSaga);
}

export default watchUser;
