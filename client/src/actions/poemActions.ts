import {Artpoem} from "../types/types";

export const getAllPoems = (payload: Artpoem[]) =>
	({
		type: "GET_ALL_POEMS",
		payload,
	} as const);

export const removeAllPoems = () =>
	({
		type: "REMOVE_ALL_POEMS",
	} as const);

export type ReduxPoemState = "poem";

export type PoemActionTypes = ReturnType<typeof getAllPoems> | ReturnType<typeof removeAllPoems>;
