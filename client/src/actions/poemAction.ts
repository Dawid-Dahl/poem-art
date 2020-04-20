export const getPoems = () =>
	({
		type: "GET_POEMS",
	} as const);

export type PoemActionTypes = ReturnType<typeof getPoems>;
