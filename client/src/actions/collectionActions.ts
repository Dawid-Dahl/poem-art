import {ReduxCollection} from "../types/types";

export const addCollection = (collection: ReduxCollection) =>
	({
		type: "ADD_COLLECTION",
		collection,
	} as const);

export const syncAllCollections = (collections: ReduxCollection[]) =>
	({
		type: "SYNC_ALL_COLLECTIONS",
		collections,
	} as const);

export const removeAllCollections = () =>
	({
		type: "REMOVE_ALL_COLLECTIONS",
	} as const);

export type ReduxCollectionState = "collection";

export type CollectionActionTypes =
	| ReturnType<typeof addCollection>
	| ReturnType<typeof syncAllCollections>
	| ReturnType<typeof removeAllCollections>;
