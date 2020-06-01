import {ReduxArtPoem, EditPoemFormObject} from "../types/types";

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

export const editPoem = (payload: EditPoemFormObject) =>
	({
		type: "EDIT_POEM",
		payload,
	} as const);

export const editPoemFulfilled = () =>
	({
		type: "EDIT_POEM_FULFILLED",
	} as const);

//DELETE

export const removeAllPoems = () =>
	({
		type: "REMOVE_ALL_POEMS",
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
	| ReturnType<typeof removeAllPoems>;
