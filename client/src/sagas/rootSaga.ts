import {all} from "redux-saga/effects";
import artPoemGridSaga from "./getPoemsSaga";
import getCollectionsSaga from "./getCollectionsSaga";

export default function* rootSaga() {
	yield all([artPoemGridSaga(), getCollectionsSaga()]);
}
