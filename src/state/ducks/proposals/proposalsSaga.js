import { takeEvery, put, call, takeLatest } from "redux-saga/effects";
import {
  getProposalsRequest,
  getProposalsSuccess,
  getProposalsFail,
  createProposalRequest,
  createProposalSuccess,
  createProposalFail,
  hireProposalRequest,
  hireProposalSuccess,
  hireProposalFail,
  terminateProposalRequest,
  terminateProposalSuccess,
  terminateProposalFail,
  setCurrentProposalRequest,
  setCurrentProposalSuccess,
  setCurrentProposalFail,
  getContractsRequest,
  getContractsSuccess,
  getContractsFail,
  updateProposalRequest,
  updateProposalSuccess,
  updateProposalFail,
  deleteProposalRequest,
  deleteProposalSuccess,
  deleteProposalFail,
} from "./proposalsSlice";
import { apiCallRequest } from "../../utils/apiCaller";

function* getProposalsSaga(action) {
  try {
    const data = yield call(apiCallRequest, `/api/get-all-bids/${action.payload}`, "GET");
    yield put(getProposalsSuccess(data));
  } catch (error) {
    yield put(getProposalsFail());
  }
}

function* createProposalSaga(action) {
  try {
    yield call(apiCallRequest, "/api/create-bid", "POST", action.payload);
    yield call(apiCallRequest, "/api/conversation", "POST", {
      senderId: action.payload.user_id,
      receiverId: action.payload.Sp_Id,
      adId: action.payload.Ad_Id,
    });
    yield put(createProposalSuccess());
    window.location.href = "/News";
  } catch (error) {
    yield put(createProposalFail());
  }
}

function* hireProposalSaga(action) {
  try {
    yield call(apiCallRequest, `/api/hire-proposal/${action.payload.proposalId}`, "POST");
    yield put(getProposalsRequest(action.payload.currentProposalId));
  } catch (error) {
    yield put(hireProposalFail());
  }
}

function* terminateProposalSaga(action) {
  try {
    yield call(apiCallRequest, `/api/terminate-proposal/${action.payload.proposalId}`, "POST", {
      userReview: action.payload.userReview || null,
      userRating: action.payload.userRating || null,
    });
    yield put(getProposalsRequest(action.payload.currentProposalId));
  } catch (error) {
    yield put(terminateProposalFail());
  }
}

function* setCurrentProposalSaga(action) {
  try {
    yield put(setCurrentProposalSuccess(action.payload));
  } catch (error) {
    yield put(setCurrentProposalFail());
  }
}

function* getContractsSaga(action) {
  try {
    const data = yield call(apiCallRequest, `/api/get-contracts/${action.payload}`, "GET");
    yield put(getContractsSuccess(data));
  } catch (error) {
    yield put(getContractsFail());
  }
}

function* updateProposalSaga(action) {
  try {
    yield call(apiCallRequest, "/todos/" + action.payload._id, "PUT", {
      title: action.payload.title,
      completed: action.payload.completed,
    });
    yield put(updateProposalSuccess(action.payload));
  } catch (error) {
    yield put(updateProposalFail());
  }
}

function* deleteProposalSaga(action) {
  try {
    yield call(apiCallRequest, `/api/Delete-Ad/${action.payload}`, "DELETE");
    yield put(deleteProposalSuccess(action.payload));
  } catch (error) {
    yield put(deleteProposalFail());
  }
}

function* watchProposals() {
  yield takeEvery(getProposalsRequest, getProposalsSaga);
  yield takeEvery(createProposalRequest, createProposalSaga);
  yield takeLatest(hireProposalRequest, hireProposalSaga);
  yield takeLatest(terminateProposalRequest, terminateProposalSaga);
  yield takeEvery(setCurrentProposalRequest, setCurrentProposalSaga);
  yield takeEvery(getContractsRequest, getContractsSaga);
  yield takeEvery(updateProposalRequest, updateProposalSaga);
  yield takeEvery(deleteProposalRequest, deleteProposalSaga);
}

export default watchProposals;
