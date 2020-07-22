import {CommentActionTypes} from "../actions/commentActions";
import {Comment} from "../types/types";

export type CommentReducerState = {
	renderedComments: Comment[];
};

const initialState: CommentReducerState = {
	renderedComments: [],
};

export const commentReducer = (
	state: CommentReducerState = initialState,
	action: CommentActionTypes
): CommentReducerState => {
	switch (action.type) {
		case "POST_COMMENT_FULFILLED":
			return {...state};
		case "EDIT_COMMENT_FULFILLED":
			return {...state};
		case "REMOVE_COMMENT_FULFILLED":
			return {...state};
		default:
			return state;
	}
};
