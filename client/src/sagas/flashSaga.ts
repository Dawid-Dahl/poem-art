import {takeEvery, delay, put} from "redux-saga/effects";
import {showFlash, setFlashMessage, hideFlash} from "../actions/flashActions";

function* workerFlashSaga({message}: ReturnType<typeof showFlash>) {
	yield put(setFlashMessage(message));
	yield delay(3000);
	yield put(hideFlash());
}

function* flashSaga() {
	yield takeEvery("SHOW_FLASH", workerFlashSaga);
}

export default flashSaga;
