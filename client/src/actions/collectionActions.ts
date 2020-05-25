import {ReduxCollection, AddCollectionFormObject} from "../types/types";

export const addCollection = (collectionPayload: AddCollectionFormObject) =>
	({
		type: "ADD_COLLECTION_ASYNC",
		collectionPayload,
	} as const);

export const addCollectionFulfilled = (collection: ReduxCollection) =>
	({
		type: "ADD_COLLECTION_FULFILLED",
		collection,
	} as const);

export const addCollectionFailure = (error: Error) =>
	({
		type: "ADD_COLLECTION_FAILURE",
		error,
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

export const getAllCollectionsFailure = (error: Error) =>
	({
		type: "GET_ALL_COLLECTIONS_FAILURE",
		error,
	} as const);

export const removeAllCollections = () =>
	({
		type: "REMOVE_ALL_COLLECTIONS",
	} as const);

export type ReduxCollectionState = "collection";

export type CollectionActionTypes =
	| ReturnType<typeof addCollection>
	| ReturnType<typeof addCollectionFulfilled>
	| ReturnType<typeof addCollectionFailure>
	| ReturnType<typeof getAllCollections>
	| ReturnType<typeof getAllCollectionsFulfilled>
	| ReturnType<typeof getAllCollectionsFailure>
	| ReturnType<typeof removeAllCollections>;
