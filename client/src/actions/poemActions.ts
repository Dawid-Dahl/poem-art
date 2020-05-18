export const getAllPoems = () =>
	({
		type: "GET_ALL_POEMS",
	} as const);

export const removeAllPoems = () =>
	({
		type: "REMOVE_ALL_POEMS",
	} as const);

export type ReduxPoemState = "poem";

export type PoemActionTypes = ReturnType<typeof getPoems> | ReturnType<typeof removeAllPoems>;
