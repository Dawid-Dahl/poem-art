import {takeEvery, call, put} from "redux-saga/effects";
import {apiService} from "../api/apiService";
import {getAllPoemsFulfilled} from "../actions/poemActions";
import {parseMainApiResponse} from "../utils/utils";
import {ArtPoem} from "../types/types";

function* workerGetPoemsSaga() {
	try {
		const res = yield call(apiService.refreshAndFetch, "artPoem/get-all");

		const json = yield call([res, "json"]);

		const artPoems: ArtPoem[] = parseMainApiResponse(json);

		yield put(getAllPoemsFulfilled(artPoems));
	} catch (e) {
		console.log(e);
	}
}

function* poemsSaga() {
	yield takeEvery("GET_ALL_POEMS_ASYNC", workerGetPoemsSaga);
}

export default poemsSaga;
