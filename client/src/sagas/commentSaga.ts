import {takeEvery, call, put} from "redux-saga/effects";
import {postComment, addCommentsToRenderedComments} from "../actions/commentActions";
import {apiService} from "../api/apiService";
import {parseMainApiResponse, comment} from "../utils/utils";

function* workerPostComment({commentContent, artPoemId}: ReturnType<typeof postComment>) {
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
}

function* commentSaga() {
	yield takeEvery("POST_COMMENT", workerPostComment);
}

export default commentSaga;
