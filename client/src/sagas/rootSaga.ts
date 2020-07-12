import {all} from "redux-saga/effects";
import asyncPoemsSaga from "./asyncPoemsSaga";
import collectionsSaga from "./collectionsSaga";
import flashSaga from "./flashSaga";
import loginSaga from "./loginSaga";
import syncPoemsSaga from "./syncPoemsSaga";

export default function* rootSaga() {
	yield all([asyncPoemsSaga(), syncPoemsSaga(), collectionsSaga(), flashSaga(), loginSaga()]);
}
