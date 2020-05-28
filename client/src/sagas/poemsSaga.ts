import {takeEvery, call, put} from "redux-saga/effects";
import {apiService} from "../api/apiService";
import {
	getAllPoemsFulfilled,
	uploadPoem,
	getPoem,
	getPoemFulfilled,
	getPoemFailed,
} from "../actions/poemActions";
import {parseMainApiResponse} from "../utils/utils";
import {ReduxArtPoem} from "../types/types";
import {showFlash} from "../actions/flashActions";
import {startLoading, completeLoading} from "../actions/loadingActions";

function* workerGetPoem({artPoemId}: ReturnType<typeof getPoem>) {
	try {
		yield put(startLoading());

		const res = yield call(apiService.refreshAndFetch, `artpoem/get-artpoem?id=${artPoemId}`);

		if (res.ok) {
			const {payload} = yield call([res, "json"]);

			const artPoem: ReduxArtPoem = JSON.parse(payload);

			yield put(completeLoading());

			yield put(getPoemFulfilled(artPoem));
		} else {
			const {payload} = yield call([res, "json"]);

			yield put(completeLoading());

			yield showFlash(JSON.parse(payload).message);

			yield put(getPoemFailed());
		}
	} catch (e) {
		console.log(e);
	}
}

function* workerGetPoems() {
	try {
		yield put(startLoading());

		const res = yield call(apiService.refreshAndFetch, "artpoem/get-all");

		const json = yield call([res, "json"]);

		const artPoems: ReduxArtPoem[] = parseMainApiResponse(json);

		yield put(completeLoading());

		yield put(getAllPoemsFulfilled(artPoems));
	} catch (e) {
		console.log(e);
	}
}

function* workerUploadPoems({payload}: ReturnType<typeof uploadPoem>) {
	const image = payload.get("imageFile") as File;

	if (image.size >= 5242880) {
		yield put(showFlash("Please choose an image smaller than 5 MB in size"));
		return;
	}

	const res = yield call(apiService.refreshAndFetch, "artpoem/upload", {
		method: "POST",
		body: payload,
	});

	const data = yield call([res, "json"]);

	yield put(showFlash(JSON.parse(data.payload).message));
}

function* poemsSaga() {
	yield takeEvery("GET_POEM", workerGetPoem);
	yield takeEvery("GET_ALL_POEMS", workerGetPoems);
	yield takeEvery("UPLOAD_POEM", workerUploadPoems);
}

export default poemsSaga;
