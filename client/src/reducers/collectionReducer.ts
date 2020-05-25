import {ReduxCollection} from "../types/types";
import {CollectionActionTypes} from "../actions/collectionActions";

export type CollectionReducerState = {
	collections: ReduxCollection[];
};

const initialState: CollectionReducerState = {
	collections: [],
};

export const collectionReducer = (
	state: CollectionReducerState = initialState,
	action: CollectionActionTypes
): CollectionReducerState => {
	switch (action.type) {
		case "ADD_COLLECTION_FULFILLED":
			return {...state, collections: [...state.collections, action.collection]};
		case "GET_ALL_COLLECTIONS_FULFILLED":
			return {...state, collections: action.collections};
		case "REMOVE_ALL_COLLECTIONS":
			return {...state, collections: []};
		default:
			return state;
	}
};
