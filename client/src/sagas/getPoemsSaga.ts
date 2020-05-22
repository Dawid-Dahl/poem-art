import {takeEvery, call, put} from "redux-saga/effects";
import {apiService} from "../api/apiService";
import {getAllPoemsFulfilled} from "../actions/poemActions";
import {parseMainApiResponse} from "../utils/utils";
import {ArtPoem} from "../types/types";

function* getPoemsSagaWorker() {
	try {
		const res = yield call(apiService.refreshAndFetch, "artPoem/get-all");

		const artPoems: ArtPoem[] = parseMainApiResponse(res);

		yield put(getAllPoemsFulfilled(artPoems));
	} catch (e) {
		console.log(e);
	}
}

function* getPoemsSaga() {
	yield takeEvery("GET_ALL_POEMS_ASYNC", getPoemsSagaWorker);
}

export default getPoemsSaga;
