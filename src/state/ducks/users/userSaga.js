import { takeEvery, put, call } from "redux-saga/effects";
import { apiCallRequest } from "../../utils/apiCaller";
import {
  loginFail,
  loginRequest,
  loginSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  getUserSuccess,
  getUserFail,
  getUserRequest
} from "./userSLice";

function* userLoginSaga(action) {
    try {
        const data = yield call(apiCallRequest, `/api/login-User`, "POST", action.payload);
        localStorage.setItem("user_id",data.user_id);
        if (data.user)yield put(loginSuccess(data.user));
        else throw new Error("user not found")
    } catch (error) {
        yield put(loginFail());
    }
}

function* userRegisterSaga(action){
    try {
        const data=yield call(apiCallRequest,`${action.payload.roll===1?"/api/signup-User":"/api/signup-SP"}`,"POST",action.payload);
        yield put(registerSuccess())
    } catch (error) {
        yield put(registerFail())
    }
}

function* userLogoutSaga(action){
    try {
        localStorage.clear()
        yield put(logoutSuccess())
        window.location.href="/"
    } catch (error) {
        yield put(logoutFail())
    }
}

function* getUserSaga(action){
    try {
        const data=yield call(apiCallRequest,`/api/get-User/${localStorage.getItem("user_id")}`, "GET")
        yield put(getUserSuccess(data.user))
    } catch (error) {
        yield put(getUserFail())
    }
}

function* watchUser() {
    yield takeEvery(loginRequest, userLoginSaga);
    yield takeEvery(getUserRequest,getUserSaga);
    yield takeEvery(registerRequest, userRegisterSaga);
    yield takeEvery(logoutRequest,userLogoutSaga);
}

export default watchUser;