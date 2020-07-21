//READ

import {ReduxCollection, ReduxArtPoem, User} from "../types/types";

export const renderPoems = (artPoems: ReduxArtPoem[]) =>
	({
		type: "RENDER_POEMS",
		artPoems,
	} as const);

export const renderPoemsFulfilled = (artPoems: ReduxArtPoem[]) =>
	({
		type: "RENDER_POEMS_FULFILLED",
		artPoems,
	} as const);

export const renderSocialFeed = (cachedPoems: ReduxArtPoem[], poemCount = 10) =>
	({
		type: "RENDER_SOCIAL_FEED",
		cachedPoems,
		poemCount,
	} as const);

export const renderSocialFeedFulfilled = (artPoemsFromCache: ReduxArtPoem[]) =>
	({
		type: "RENDER_SOCIAL_FEED_FULFILLED",
		artPoemsFromCache,
	} as const);

export const selectPoem = (artPoem: ReduxArtPoem) =>
	({
		type: "SELECT_POEM",
		artPoem,
	} as const);

export const deselectPoem = () =>
	({
		type: "DESELECT_POEM",
	} as const);

export const getPoemsByUserAndCollection = (
	cachedPoems: ReduxArtPoem[],
	reduxCollection: ReduxCollection | null,
	user: User
) =>
	({
		type: "GET_POEMS_BY_USER_AND_COLLECTION",
		cachedPoems,
		reduxCollection,
		user,
	} as const);

//CREATE

//UPDATE

//DELETE

export const removePoemsFromRenderedPoems = (artPoemIds: Array<ReduxArtPoem["id"]>) =>
	({
		type: "REMOVE_POEMS_FROM_RENDERED_POEMS",
		artPoemIds,
	} as const);

export const removeAllPoemsFromRenderedPoems = () =>
	({
		type: "REMOVE_ALL_POEMS_FROM_RENDERED_POEMS",
	} as const);

export type SyncPoemActionTypes =
	| ReturnType<typeof renderPoems>
	| ReturnType<typeof renderPoemsFulfilled>
	| ReturnType<typeof renderSocialFeed>
	| ReturnType<typeof renderSocialFeedFulfilled>
	| ReturnType<typeof selectPoem>
	| ReturnType<typeof deselectPoem>
	| ReturnType<typeof removePoemsFromRenderedPoems>
	| ReturnType<typeof removeAllPoemsFromRenderedPoems>
	| ReturnType<typeof getPoemsByUserAndCollection>;
