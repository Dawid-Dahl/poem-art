import {Collection} from "../types/types";

export const syncAllCollections = (collections: Collection[]) =>
	({
		type: "SYNC_ALL_COLLECTIONS",
		collections,
	} as const);

export const removeAllCollections = () =>
	({
		type: "REMOVE_ALL_COLLECTIONS",
	} as const);

export type CollectionActionTypes =
	| ReturnType<typeof syncAllCollections>
	| ReturnType<typeof removeAllCollections>;
