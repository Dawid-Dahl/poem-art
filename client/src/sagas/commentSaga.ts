import {takeEvery, call, put} from "redux-saga/effects";
import {
	postComment,
	addCommentsToRenderedComments,
	getComments,
	renderComments,
} from "../actions/commentActions";
import {apiService} from "../api/apiService";
import {parseMainApiResponse, comment} from "../utils/utils";
import {ReduxComment} from "../types/types";

function* workerGetComments({artPoemId, commentCount}: ReturnType<typeof getComments>) {
	try {
		const res = yield call(
			apiService.refreshAndFetch,
			`comments/get?artPoemId=${artPoemId}&commentCount=${commentCount}`
		);

		const json = yield call([res, "json"]);

		const comments: ReduxComment[] = parseMainApiResponse(json);

		yield put(renderComments(comments));
	} catch (e) {
		console.log(e);
	}
}

function* workerPostComment({commentContent, artPoemId}: ReturnType<typeof postComment>) {
	try {
		const res = yield call(apiService.refreshAndFetch, "comments/post", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({artPoemId: artPoemId, commentContent: commentContent}),
		});

		const json = yield call([res, "json"]);

		const insertResult = JSON.parse(parseMainApiResponse(json).insertResult);

		yield put(
			addCommentsToRenderedComments(
				new Array(
					comment().create(
						insertResult.id,
						insertResult.comment,
						insertResult.likes,
						insertResult.user,
						insertResult.createdAt,
						insertResult.updatedAt
					)
				)
			)
		);
	} catch (e) {
		console.log(e);
	}
}

function* commentSaga() {
	yield takeEvery("GET_COMMENTS", workerGetComments);
	yield takeEvery("POST_COMMENT", workerPostComment);
}

export default commentSaga;