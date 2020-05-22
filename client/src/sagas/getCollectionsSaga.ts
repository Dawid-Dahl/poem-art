import {takeEvery, call, put} from "redux-saga/effects";
import {apiService} from "../api/apiService";
import {parseMainApiResponse} from "../utils/utils";
import {ReduxCollection} from "../types/types";
import {getAllCollectionsFulfilled} from "../actions/collectionActions";

function* getCollectionsSagaWorker() {
	try {
		const res = yield call(apiService.refreshAndFetch, "collections/get-all");

		const collections: ReduxCollection[] = parseMainApiResponse(res);

		yield put(getAllCollectionsFulfilled(collections));
	} catch (e) {
		console.log(e);
	}
}

function* getCollectionsSaga() {
	yield takeEvery("GET_ALL_COLLECTIONS_ASYNC", getCollectionsSagaWorker);
}

export default getCollectionsSaga;
