import {takeEvery, call, put} from "redux-saga/effects";
import {apiService} from "../api/apiService";
import {getAllPoemsFulfilled, uploadPoem} from "../actions/poemActions";
import {parseMainApiResponse} from "../utils/utils";
import {ArtPoem} from "../types/types";
import {showFlash} from "../actions/flashActions";
import {startLoading, completeLoading} from "../actions/loadingActions";

function* workerUploadPoems({payload}: ReturnType<typeof uploadPoem>) {
	const image = payload.get("imageFile") as File;

	if (image.size >= 5242880) {
		yield put(showFlash("Please choose an image smaller than 5 MB in size"));
		return;
	}

	const res = yield call(apiService.refreshAndFetch, "artPoem/upload", {
		method: "POST",
		body: payload,
	});

	const data = yield call([res, "json"]);

	yield put(showFlash(JSON.parse(data.payload).message));
}

function* workerGetPoems() {
	try {
		yield put(startLoading());

		const res = yield call(apiService.refreshAndFetch, "artPoem/get-all");

		const json = yield call([res, "json"]);

		const artPoems: ArtPoem[] = parseMainApiResponse(json);

		yield put(completeLoading());

		yield put(getAllPoemsFulfilled(artPoems));
	} catch (e) {
		console.log(e);
	}
}

function* poemsSaga() {
	yield takeEvery("UPLOAD_POEM", workerUploadPoems);
	yield takeEvery("GET_ALL_POEMS", workerGetPoems);
}

export default poemsSaga;
