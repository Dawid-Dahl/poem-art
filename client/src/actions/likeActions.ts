//ASYNC

export const likePoem = () =>
	({
		type: "LIKE_POEM",
	} as const);

export const likePoemFulfilled = () =>
	({
		type: "LIKE_POEM_FULFILLED",
	} as const);

export const likePoemFailed = () =>
	({
		type: "LIKE_POEM_FAILED",
	} as const);

export const unlikePoem = () =>
	({
		type: "UNLIKE_POEM",
	} as const);
export const unlikePoemFulfilled = () =>
	({
		type: "UNLIKE_POEM_FULFILLED",
	} as const);

export const unlikePoemFailed = () =>
	({
		type: "UNLIKE_POEM_FAILED",
	} as const);

//SYNC

export const enableHasUserLikedPoem = () =>
	({
		type: "ENABLE_HAS_USER_LIKED_POEM",
	} as const);

export const disableHasUserLikedPoem = () =>
	({
		type: "DISABLE_HAS_USER_LIKED_POEM",
	} as const);

export type LikeActionTypes =
	| ReturnType<typeof likePoem>
	| ReturnType<typeof likePoemFulfilled>
	| ReturnType<typeof likePoemFailed>
	| ReturnType<typeof unlikePoem>
	| ReturnType<typeof unlikePoemFulfilled>
	| ReturnType<typeof unlikePoemFailed>
	| ReturnType<typeof enableHasUserLikedPoem>
	| ReturnType<typeof disableHasUserLikedPoem>;
