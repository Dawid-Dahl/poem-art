import {takeEvery, call, put} from "redux-saga/effects";
import {apiService} from "../api/apiService";
import {parseMainApiResponse} from "../utils/utils";
import {likePoemFulfilled} from "../actions/asyncPoemActions";
import {unlikePoemFulfilled, likePoemFailed} from "../actions/likeActions";

function* workerLikePoem() {
	try {
		yield put(likePoemFulfilled());
	} catch (e) {
		console.log(e);
		yield put(likePoemFailed());
	}
}

function* workerUnlikePoem() {
	try {
		yield put(unlikePoemFulfilled());
	} catch (e) {
		console.log(e);
	}
}

function* likeSaga() {
	yield takeEvery("LIKE_POEM", workerLikePoem);
	yield takeEvery("UNLIKE_POEM", workerUnlikePoem);
}

export default likeSaga;
