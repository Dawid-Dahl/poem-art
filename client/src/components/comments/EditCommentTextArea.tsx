import React from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {editComment} from "../../actions/commentActions";
import {RootState} from "../../store";
import {showFlash} from "../../actions/flashActions";
import Button from "../Button";

type Props = {
	dataCommentId: number;
	value: string;
	onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	editCommentContent: string;
	setEditComment: React.Dispatch<React.SetStateAction<string>>;
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => (editCommentContent: string) => {
	const dispatch = useDispatch();

	const commentSelected = useSelector((state: RootState) => state.commentReducer.commentSelected);

	try {
		e.preventDefault();

		if (editComment.length === 0) {
			dispatch(showFlash("You can't post an empty comment."));
			return;
		}

		if (commentSelected) {
			dispatch(editComment(editCommentContent, commentSelected.id));
		}
	} catch (e) {
		console.log(e);
	}
};

const EditCommentTextArea: React.FC<Props> = ({
	dataCommentId,
	value,
	onChangeHandler,
	editCommentContent,
	setEditComment,
}) => {
	return (
		<>
			<StyledForm
				action="POST"
				autoComplete="off"
				onSubmit={e => handleSubmit(e)(editCommentContent)}
			>
				<TextArea
					data-comment-id={dataCommentId}
					value={value}
					onChange={onChangeHandler}
					rows={3}
					cols={50}
				/>
				<Button
					title="Post"
					kind="primary"
					type="submit"
					minimalMinWidth
					noMargin
					dataAttribute={{key: "comment-id", value: dataCommentId.toString()}}
				/>
			</StyledForm>
		</>
	);
};

export default EditCommentTextArea;

const StyledForm = styled.form``;

const TextArea = styled.textarea`
	width: 100%;
	border-radius: 5px;
	color: var(--comment-grey);
	outline: none;
	transition: box-shadow 0.3s;
	font-family: "Roboto", sans-serif;
	font-size: 16px;
	font-weight: lighter;

	&:focus {
		box-shadow: 0 0 0 2pt var(--main-btn-color);
	}
`;
