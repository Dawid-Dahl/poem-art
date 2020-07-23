import React, {Dispatch} from "react";
import styled from "styled-components";
import {
	enableCommentEdit,
	selectComment,
	deleteComment,
	disableCommentEdit,
} from "../../actions/commentActions";
import {useDispatch} from "react-redux";
import {ReduxComment} from "../../types/types";

type Props = {
	isEditingComment: boolean;
	comment: ReduxComment;
};

const handleEdit = (dispatch: Dispatch<any>) => (
	comment: ReduxComment,
	isEditingComment: boolean
) => {
	if (!isEditingComment) {
		dispatch(enableCommentEdit());
		dispatch(selectComment(comment));
	} else {
		dispatch(disableCommentEdit());
	}
};

const handleDelete = (dispatch: Dispatch<any>) => (id: ReduxComment["id"]) => {
	confirm("Are you sure you want to delete this comment?") && dispatch(deleteComment(id));
};

const EditDeleteButtons: React.FC<Props> = ({comment, isEditingComment}) => {
	const dispatch = useDispatch();

	return (
		<SpanWrapper data-comment-id={comment.id}>
			<span
				data-comment-id={comment.id}
				onClick={e => handleEdit(dispatch)(comment, isEditingComment)}
			>
				🖋️
			</span>
			<span data-comment-id={comment.id} onClick={e => handleDelete(dispatch)(comment.id)}>
				❌
			</span>
		</SpanWrapper>
	);
};

export default EditDeleteButtons;

const SpanWrapper = styled.div`
	width: 100%;
	text-align: end;
	position: relative;
	top: -0.6em;
	left: 0.1em;

	@media only screen and (max-width: 1000px) {
		top: -1.3em;
	}

	span {
		opacity: 0%;
		font-size: 12px;
		transition: all 0.3s;
		z-index: 10;
		margin: 0 0.4em 0 0;
		cursor: pointer;

		@media only screen and (min-width: 1200px) {
			margin: 0 0.6em 0 0;
		}
	}
`;
