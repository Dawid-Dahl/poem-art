import React from "react";
import styled from "styled-components";
import Comment from "./Comment";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const CommentsDisplay = () => {
	const renderedComments = useSelector(
		(state: RootState) => state.commentReducer.renderedComments
	);

	return (
		<>
			<Wrapper>
				{renderedComments.map(comment => (
					<Comment
						key={comment.id}
						id={comment.id}
						comment={comment.comment}
						user={comment.user}
						createdAt={comment.createdAt}
					/>
				))}
			</Wrapper>
		</>
	);
};

export default CommentsDisplay;

const Wrapper = styled.div`
	width: 100%;
	margin: 0 0 1em 0;
`;
