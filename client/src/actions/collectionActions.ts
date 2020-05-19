import {ReduxCollection} from "../types/types";

export const addCollection = (collection: ReduxCollection) =>
	({
		type: "ADD_COLLECTION",
		collection,
	} as const);

export const getAllCollections = (collections: ReduxCollection[]) =>
	({
		type: "GET_ALL_COLLECTIONS",
		collections,
	} as const);

export const removeAllCollections = () =>
	({
		type: "REMOVE_ALL_COLLECTIONS",
	} as const);

export type ReduxCollectionState = "collection";

export type CollectionActionTypes =
	| ReturnType<typeof addCollection>
	| ReturnType<typeof getAllCollections>
	| ReturnType<typeof removeAllCollections>;
