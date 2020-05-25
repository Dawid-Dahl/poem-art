import {take, delay, put, call} from "redux-saga/effects";
import {showFlash, hideFlash, showFlashFulfilled} from "../actions/flashActions";

function* workerFlashSaga({message}: ReturnType<typeof showFlash>) {
	yield put(showFlashFulfilled(message));
	yield delay(3000);
	yield put(hideFlash());
}

function* flashSaga() {
	while (true) {
		const message = yield take("SHOW_FLASH");
		yield call(workerFlashSaga, message);
	}
}

export default flashSaga;
