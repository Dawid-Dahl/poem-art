import {Collection} from "../types/types";
import {CollectionActionTypes} from "../actions/collectionActions";

export type CollectionReducerState = {
	collections: Collection[] | null;
};

const initialState: CollectionReducerState = {
	collections: [],
};

export const collectionReducer = (
	state: CollectionReducerState = initialState,
	action: CollectionActionTypes
): CollectionReducerState => {
	switch (action.type) {
		case "SYNC_ALL_COLLECTIONS":
			return {...state, collections: action.collections};
		case "REMOVE_ALL_COLLECTIONS":
			return {...state, collections: []};
		default:
			return state;
	}
};
