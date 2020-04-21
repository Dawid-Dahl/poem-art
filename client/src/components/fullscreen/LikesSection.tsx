import React from "react";
import styled from "styled-components";

export const LikesSection = () => {
	return (
		<>
			<Wrapper>
				<p>👍🏻 3</p>
			</Wrapper>
		</>
	);
};

export default LikesSection;

const Wrapper = styled.div`
	grid-area: LikesSection;
	background-color: white;
	box-shadow: 0 0 20px black;
	border-radius: 5px;

	@media only screen and (max-width: 1280px) {
	}

	@media only screen and (max-width: 800px) {
	}

	p {
		padding: 50px;
		text-align: center;
		font-size: 1.5em;
	}
`;
