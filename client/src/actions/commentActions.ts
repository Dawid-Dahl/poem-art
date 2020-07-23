import {ReduxArtPoem, ReduxComment} from "../types/types";

// -> ASYNC

//READ

export const getComments = (artPoemId: ReduxArtPoem["id"], commentCount = 20) =>
	({
		type: "GET_COMMENTS",
		artPoemId,
		commentCount,
	} as const);
export const getCommentsFulfilled = () =>
	({
		type: "GET_COMMENTS_FULFILLED",
	} as const);
export const getCommentsFailed = () =>
	({
		type: "GET_COMMENTS_FAILED",
	} as const);

//CREATE

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

//UPDATE

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

//DELETE

export const deleteComment = (commentId: ReduxComment["id"]) =>
	({
		type: "DELETE_COMMENT",
		commentId,
	} as const);
export const deleteCommentFulfilled = () =>
	({
		type: "DELETE_COMMENT_FULFILLED",
	} as const);
export const deleteCommentFailed = () =>
	({
		type: "DELETE_COMMENT_FAILED",
	} as const);

// -> SYNC

export const renderComments = (comments: ReduxComment[]) =>
	({
		type: "RENDER_COMMENTS",
		comments,
	} as const);
export const addCommentsToRenderedComments = (comments: ReduxComment[]) =>
	({
		type: "ADD_COMMENTS_TO_RENDERED_COMMENTS",
		comments,
	} as const);
export const removeCommentsFromRenderedComments = (commentIds: Array<ReduxComment["id"]>) =>
	({
		type: "REMOVE_COMMENTS_FROM_RENDERED_COMMENTS",
		commentIds,
	} as const);
export const selectComment = (comment: ReduxComment) =>
	({
		type: "SELECT_COMMENT",
		comment,
	} as const);
export const deselectComment = () =>
	({
		type: "DESELECT_COMMENT",
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
export const enableCommentEdit = () =>
	({
		type: "ENABLE_COMMENT_EDIT",
	} as const);
export const disableCommentEdit = () =>
	({
		type: "DISABLE_COMMENT_EDIT",
	} as const);

export type CommentActionTypes =
	| ReturnType<typeof postComment>
	| ReturnType<typeof postCommentFulfilled>
	| ReturnType<typeof postCommentFailed>
	| ReturnType<typeof editComment>
	| ReturnType<typeof editCommentFulfilled>
	| ReturnType<typeof editCommentFailed>
	| ReturnType<typeof deleteComment>
	| ReturnType<typeof deleteCommentFulfilled>
	| ReturnType<typeof deleteCommentFailed>
	| ReturnType<typeof renderComments>
	| ReturnType<typeof addCommentsToRenderedComments>
	| ReturnType<typeof removeCommentsFromRenderedComments>
	| ReturnType<typeof selectComment>
	| ReturnType<typeof deselectComment>
	| ReturnType<typeof emptyRenderedComments>
	| ReturnType<typeof openCommentSubmitSection>
	| ReturnType<typeof closeCommentSubmitSection>
	| ReturnType<typeof enableCommentEdit>
	| ReturnType<typeof disableCommentEdit>;
