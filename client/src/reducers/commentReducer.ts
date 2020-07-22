import {CommentActionTypes} from "../actions/commentActions";
import {ReduxComment} from "../types/types";

export type CommentReducerState = {
	renderedComments: ReduxComment[];
	isCommentSubmitSectionActive: boolean;
};

const initialState: CommentReducerState = {
	renderedComments: [],
	isCommentSubmitSectionActive: false,
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
		case "ADD_COMMENTS_TO_RENDERED_COMMENTS":
			return {...state, renderedComments: [...state.renderedComments, ...action.comments]};
		case "EMPTY_RENDERED_COMMENTS":
			return {...state, renderedComments: []};
		case "OPEN_COMMENT_SUBMIT_SECTION":
			return {...state, isCommentSubmitSectionActive: true};
		case "CLOSE_COMMENT_SUBMIT_SECTION":
			return {...state, isCommentSubmitSectionActive: false};
		default:
			return state;
	}
};
