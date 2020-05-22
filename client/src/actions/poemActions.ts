import {ArtPoem} from "../types/types";

export const getAllPoems = () =>
	({
		type: "GET_ALL_POEMS_ASYNC",
	} as const);

export const getAllPoemsFulfilled = (artPoems: ArtPoem[]) =>
	({
		type: "GET_ALL_POEMS_FULFILLED",
		artPoems,
	} as const);

export const getAllPoemsFailed = (error: Error) =>
	({
		type: "GET_ALL_POEMS_FAILED",
		error,
	} as const);

export const removeAllPoems = () =>
	({
		type: "REMOVE_ALL_POEMS",
	} as const);

export type ReduxPoemState = "poem";

export type PoemActionTypes =
	| ReturnType<typeof getAllPoems>
	| ReturnType<typeof getAllPoemsFulfilled>
	| ReturnType<typeof getAllPoemsFailed>
	| ReturnType<typeof removeAllPoems>;
