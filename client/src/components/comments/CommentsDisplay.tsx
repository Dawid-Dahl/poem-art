import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

const CommentsDisplay = () => {
	return (
		<>
			<Wrapper>
				<Comment />
			</Wrapper>
		</>
	);
};

export default CommentsDisplay;

const Wrapper = styled.div``;
