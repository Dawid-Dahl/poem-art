export const postComment = (commentContent: string) =>
	({
		type: "POST_COMMENT",
		commentContent,
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

export type CommentActionTypes =
	| ReturnType<typeof postComment>
	| ReturnType<typeof postCommentFulfilled>
	| ReturnType<typeof postCommentFailed>
	| ReturnType<typeof editComment>
	| ReturnType<typeof editCommentFulfilled>
	| ReturnType<typeof editCommentFailed>
	| ReturnType<typeof removeComment>
	| ReturnType<typeof removeCommentFulfilled>
	| ReturnType<typeof removeCommentFailed>;
