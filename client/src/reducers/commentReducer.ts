import {CommentActionTypes} from "../actions/commentActions";
import {Comment} from "../types/types";

export type CommentReducerState = {
	comments: Comment[];
};

const initialState: CommentReducerState = {
	comments: [],
};

export const flashReducer = (
	state: CommentReducerState = initialState,
	action: CommentActionTypes
): CommentReducerState => {
	switch (action.type) {
		case "POST_COMMENT_FULFILLED":
			return {...state};
		case "REMOVE_COMMENT_FULFILLED":
			return {...state};
		default:
			return state;
	}
};
