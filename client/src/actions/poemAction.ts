export const getPoems = () =>
	({
		type: "GET_POEMS",
	} as const);

export const removeAllPoems = () =>
	({
		type: "REMOVE_ALL_POEMS",
	} as const);

export type PoemActionTypes = ReturnType<typeof getPoems> | ReturnType<typeof removeAllPoems>;
