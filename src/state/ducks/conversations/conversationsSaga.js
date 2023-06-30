import { takeEvery, put, call } from "redux-saga/effects";
import { apiCallRequest } from "../../utils/apiCaller";
import { getConversationsRequest, getConversationsSuccess, getConversationsFail, markConversationReadRequest, markConversationReadSuccess, markConversationReadFail } from "./conversationsSlice";


function* getConversationsSaga(action) {
  try {
    const data = yield call(apiCallRequest, `/api/get-active-conversations/${localStorage.getItem("user_id")}`, "GET");
    yield put(getConversationsSuccess(data));
  } catch (error) {
    yield put(getConversationsFail());
  }
}

function*  markCoversationReadSaga(action){
  try {
    yield call(apiCallRequest, `/api/read-conversation/${localStorage.getItem("user_id")}/${action.payload}`, "POST");
    yield put(getConversationsRequest())
    yield put(markConversationReadSuccess());
  } catch (error) {
    yield put(markConversationReadFail());
  }
}

function* watchConversations() {
  yield takeEvery(getConversationsRequest, getConversationsSaga);
  yield takeEvery(markConversationReadRequest, markCoversationReadSaga)
}

export default watchConversations;
