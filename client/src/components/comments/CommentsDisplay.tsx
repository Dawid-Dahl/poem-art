import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

const CommentsDisplay = () => {
	return (
		<>
			<Wrapper>
				<Comment />
				<Comment />
				<Comment />
			</Wrapper>
		</>
	);
};

export default CommentsDisplay;

const Wrapper = styled.div`
	width: 100%;
	margin: 0 0 1em 0;
`;
