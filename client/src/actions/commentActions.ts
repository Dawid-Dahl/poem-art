//ASYNC

import {ReduxArtPoem, ReduxComment} from "../types/types";

export const postComment = (commentContent: string, artPoemId: ReduxArtPoem["id"]) =>
	({
		type: "POST_COMMENT",
		commentContent,
		artPoemId,
	} as const);
export const postCommentFulfilled = () =>
	({
		type: "POST_COMMENT_FULFILLED",
	} as const);
export const postCommentFailed = () =>
	({
		type: "POST_COMMENT_FAILED",
	} as const);
export const editComment = () =>
	({
		type: "EDIT_COMMENT",
	} as const);
export const editCommentFulfilled = () =>
	({
		type: "EDIT_COMMENT_FULFILLED",
	} as const);
export const editCommentFailed = () =>
	({
		type: "EDIT_COMMENT_FAILED",
	} as const);
export const removeComment = () =>
	({
		type: "REMOVE_COMMENT",
	} as const);
export const removeCommentFulfilled = () =>
	({
		type: "REMOVE_COMMENT_FULFILLED",
	} as const);
export const removeCommentFailed = () =>
	({
		type: "REMOVE_COMMENT_FAILED",
	} as const);

//SYNC

export const addCommentsToRenderedComments = (comments: ReduxComment[]) =>
	({
		type: "ADD_COMMENTS_TO_RENDERED_COMMENTS",
		comments,
	} as const);
export const emptyRenderedComments = () =>
	({
		type: "EMPTY_RENDERED_COMMENTS",
	} as const);
export const openCommentSubmitSection = () =>
	({
		type: "OPEN_COMMENT_SUBMIT_SECTION",
	} as const);
export const closeCommentSubmitSection = () =>
	({
		type: "CLOSE_COMMENT_SUBMIT_SECTION",
	} as const);

export type CommentActionTypes =
	| ReturnType<typeof postComment>
	| ReturnType<typeof postCommentFulfilled>
	| ReturnType<typeof postCommentFailed>
	| ReturnType<typeof editComment>
	| ReturnType<typeof editCommentFulfilled>
	| ReturnType<typeof editCommentFailed>
	| ReturnType<typeof removeComment>
	| ReturnType<typeof removeCommentFulfilled>
	| ReturnType<typeof removeCommentFailed>
	| ReturnType<typeof addCommentsToRenderedComments>
	| ReturnType<typeof emptyRenderedComments>
	| ReturnType<typeof openCommentSubmitSection>
	| ReturnType<typeof closeCommentSubmitSection>;
