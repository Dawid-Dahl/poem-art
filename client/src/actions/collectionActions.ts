import {ReduxCollection} from "../types/types";

export const addCollection = (collection: ReduxCollection) =>
	({
		type: "ADD_COLLECTION",
		collection,
	} as const);

export const getAllCollections = () =>
	({
		type: "GET_ALL_COLLECTIONS_ASYNC",
	} as const);

export const getAllCollectionsFulfilled = (collections: ReduxCollection[]) =>
	({
		type: "GET_ALL_COLLECTIONS_FULFILLED",
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
	| ReturnType<typeof getAllCollectionsFulfilled>
	| ReturnType<typeof removeAllCollections>;
