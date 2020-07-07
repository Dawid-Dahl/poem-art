import {ReduxArtPoem, ReduxCollection, User} from "../types/types";

//READ

export const getPoem = (artPoemId: ReduxArtPoem["id"]) =>
	({
		type: "GET_POEM",
		artPoemId,
	} as const);

export const getPoemFulfilled = (artPoem: ReduxArtPoem) =>
	({
		type: "GET_POEM_FULFILLED",
		artPoem,
	} as const);

export const getPoemFailed = () =>
	({
		type: "GET_POEM_FAILED",
	} as const);

export const deselectPoem = () =>
	({
		type: "DESELECT_POEM",
	} as const);

export const getAllPoems = () =>
	({
		type: "GET_ALL_POEMS",
	} as const);

export const getAllPoemsFulfilled = (artPoems: ReduxArtPoem[]) =>
	({
		type: "GET_ALL_POEMS_FULFILLED",
		artPoems,
	} as const);

export const getAllPoemsFailed = (error: Error) =>
	({
		type: "GET_ALL_POEMS_FAILED",
		error,
	} as const);

export const getPoemsByUserId = (id: User["id"], numberOfPoems = 10) =>
	({
		type: "GET_POEMS_BY_USER_ID",
		id,
		numberOfPoems,
	} as const);

export const getPoemsByUserIdFulfilled = (artPoems: ReduxArtPoem[]) =>
	({
		type: "GET_POEMS_BY_USER_ID_FULFILLED",
		artPoems,
	} as const);

export const getPoemsByUserIdFailed = (error: Error) =>
	({
		type: "GET_POEMS_BY_USER_ID_FAILED",
		error,
	} as const);

export const getPoemsByCollection = (collection: ReduxCollection | null, numberOfPoems = 10) =>
	({
		type: "GET_POEMS_BY_COLLECTION",
		collection,
		numberOfPoems,
	} as const);

export const getPoemsByCollectionFulfilled = (artPoems: ReduxArtPoem[]) =>
	({
		type: "GET_POEMS_BY_COLLECTION_FULFILLED",
		artPoems,
	} as const);

export const getPoemsByCollectionFailed = (error: Error) =>
	({
		type: "GET_POEMS_BY_COLLECTION_FAILED",
		error,
	} as const);

//CREATE

export const uploadPoem = (payload: FormData) =>
	({
		type: "UPLOAD_POEM",
		payload,
	} as const);

export const uploadPoemFulfilled = () =>
	({
		type: "UPLOAD_POEM_FULFILLED",
	} as const);

//UPDATE

export const editPoem = (payload: FormData) =>
	({
		type: "EDIT_POEM",
		payload,
	} as const);

export const editPoemFulfilled = () =>
	({
		type: "EDIT_POEM_FULFILLED",
	} as const);

//DELETE

export const deletePoem = (artPoemId: ReduxArtPoem["id"]) =>
	({
		type: "DELETE_POEM",
		artPoemId,
	} as const);

export const deletePoemFulfilled = (artPoemId: ReduxArtPoem["id"]) =>
	({
		type: "DELETE_POEM_FULFILLED",
		artPoemId,
	} as const);

export const deleteAllPoems = () =>
	({
		type: "DELETE_ALL_POEMS",
	} as const);

export type ReduxPoemState = "poem";

export type PoemActionTypes =
	| ReturnType<typeof getPoem>
	| ReturnType<typeof getPoemFulfilled>
	| ReturnType<typeof getPoemFailed>
	| ReturnType<typeof deselectPoem>
	| ReturnType<typeof uploadPoem>
	| ReturnType<typeof uploadPoemFulfilled>
	| ReturnType<typeof getAllPoems>
	| ReturnType<typeof getAllPoemsFulfilled>
	| ReturnType<typeof getAllPoemsFailed>
	| ReturnType<typeof getPoemsByUserId>
	| ReturnType<typeof getPoemsByUserIdFulfilled>
	| ReturnType<typeof getPoemsByUserIdFailed>
	| ReturnType<typeof getPoemsByCollection>
	| ReturnType<typeof getPoemsByCollectionFulfilled>
	| ReturnType<typeof getPoemsByCollectionFailed>
	| ReturnType<typeof deleteAllPoems>
	| ReturnType<typeof deletePoem>
	| ReturnType<typeof deletePoemFulfilled>;
