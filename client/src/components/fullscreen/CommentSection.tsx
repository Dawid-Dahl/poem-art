import React from "react";
import styled from "styled-components";

export const CommentSection = () => {
	return (
		<>
			<Wrapper>
				<p>TODO: COMMENTS.</p>
			</Wrapper>
		</>
	);
};

export default CommentSection;

const Wrapper = styled.div`
	background-color: white;
	box-shadow: var(--box-shadow);
	border-radius: 5px;
	height: fit-content;

	p {
		margin: 0;
		padding: 50px;
		text-align: center;
		font-size: 1.5em;
	}
`;
