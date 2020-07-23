import {CommentActionTypes} from "../actions/commentActions";
import {ReduxComment} from "../types/types";

export type CommentReducerState = {
	renderedComments: ReduxComment[];
	commentSelected: ReduxComment | null;
	isCommentSubmitSectionActive: boolean;
	isEditingComment: boolean;
};

const initialState: CommentReducerState = {
	renderedComments: [],
	commentSelected: null,
	isCommentSubmitSectionActive: false,
	isEditingComment: false,
};

export const commentReducer = (
	state: CommentReducerState = initialState,
	action: CommentActionTypes
): CommentReducerState => {
	switch (action.type) {
		case "RENDER_COMMENTS":
			return {...state, renderedComments: action.comments};
		case "ADD_COMMENTS_TO_RENDERED_COMMENTS":
			return {...state, renderedComments: [...state.renderedComments, ...action.comments]};
		case "REMOVE_COMMENTS_FROM_RENDERED_COMMENTS":
			return {
				...state,
				renderedComments: state.renderedComments.filter(
					poem => !action.commentIds.includes(poem.id)
				),
			};
		case "EMPTY_RENDERED_COMMENTS":
			return {...state, renderedComments: []};
		case "SELECT_COMMENT":
			return {...state, commentSelected: action.comment};
		case "DESELECT_COMMENT":
			return {...state, commentSelected: null};
		case "OPEN_COMMENT_SUBMIT_SECTION":
			return {...state, isCommentSubmitSectionActive: true};
		case "CLOSE_COMMENT_SUBMIT_SECTION":
			return {...state, isCommentSubmitSectionActive: false};
		case "ENABLE_COMMENT_EDIT":
			return {...state, isEditingComment: true};
		case "DISABLE_COMMENT_EDIT":
			return {...state, isEditingComment: false};
		default:
			return state;
	}
};
