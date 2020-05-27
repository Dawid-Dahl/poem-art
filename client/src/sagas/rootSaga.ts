import {all} from "redux-saga/effects";
import poemsSaga from "./poemsSaga";
import collectionsSaga from "./collectionsSaga";
import flashSaga from "./flashSaga";
import loginSaga from "./loginSaga";

export default function* rootSaga() {
	yield all([poemsSaga(), collectionsSaga(), flashSaga(), loginSaga()]);
}
