import {takeEvery, call, put} from "redux-saga/effects";
import {
	login,
	loginFulfilled,
	logoutFulFilled,
	checkIfLoggedIn,
	logout,
} from "../actions/loginActions";
import {
	constructUserFromId,
	verifyAndRefreshTokenIfNeeded,
	localStorageService,
	getPayloadFromJwt,
} from "../utils/utils";
import {showFlash} from "../actions/flashActions";
import {setUser, removeUser} from "../actions/userActions";
import {removeAllCollections} from "../actions/collectionActions";
import {hidePopup} from "../actions/popupActions";
import {removeAllPoemsFromRenderedPoems} from "../actions/syncPoemAction";
import {removeAllPoemsFromCache} from "../actions/asyncPoemActions";
import {emptyRenderedComments, closeCommentSubmitSection} from "../actions/commentActions";

function* workerCheckIfLoggedIn({tokens}: ReturnType<typeof checkIfLoggedIn>) {
	if (location.pathname === "/register" || location.pathname === "/login") {
		return;
	}

	try {
		const validOrRefreshedXToken = yield call(verifyAndRefreshTokenIfNeeded, tokens);

		if (validOrRefreshedXToken) {
			const {sub} = yield call(getPayloadFromJwt, validOrRefreshedXToken);
			const user = yield call(constructUserFromId, sub);
			if (user) {
				yield put(setUser(user));
				yield call(localStorageService.setXToken, validOrRefreshedXToken);
				yield put(loginFulfilled());
			}
		} else {
			yield put(logout());
			yield put(showFlash("You're not allowed to access that page. Please log in!"));
		}
	} catch (e) {
		console.log("You're not allowed to access that page. Please log in!");
	}
}

function* workerLogin({credentials}: ReturnType<typeof login>) {
	try {
		const res = yield call(fetch, `${process.env.AUTH_FETCH_URL}/api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});
		const {success, payload, xToken, xRefreshToken} = yield call([res, "json"]);

		if (success) {
			const user = yield call(constructUserFromId, payload.user.id);

			yield call(localStorageService.setTokensInLocalStorage, {
				xToken,
				xRefreshToken,
			});

			if (user) {
				yield put(loginFulfilled());
				yield put(setUser(user));
				yield put(showFlash("You're now logged in!"));
			} else {
				yield put(showFlash(payload?.message ?? ""));
			}
		} else {
			yield put(showFlash(payload?.message ?? ""));
		}
	} catch (e) {
		console.log(e);
	}
}

function* workerLogout() {
	yield put(logoutFulFilled());
	yield call(localStorageService.removeTokensFromLocalStorage);
	yield put(removeUser());
	yield put(removeAllCollections());
	yield put(hidePopup());
	yield put(removeAllPoemsFromRenderedPoems());
	yield put(removeAllPoemsFromCache());
	yield put(emptyRenderedComments());
	yield put(closeCommentSubmitSection());
	yield put(showFlash("You're now logged out!"));
}

function* loginSaga() {
	yield takeEvery("CHECK_IF_LOGGED_IN", workerCheckIfLoggedIn);
	yield takeEvery("LOGIN", workerLogin);
	yield takeEvery("LOGOUT", workerLogout);
}

export default loginSaga;
