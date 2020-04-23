import React from "react";
import styled from "styled-components";

type Props = {
	likes: number;
};

export const LikesSection: React.FC<Props> = ({likes}) => {
	return (
		<>
			<Wrapper>
				<p>{`👍🏻 ${likes}`}</p>
			</Wrapper>
		</>
	);
};

export default LikesSection;

const Wrapper = styled.div`
	margin: 0 0 1em 0;
	background-color: white;
	box-shadow: var(--box-shadow);
	border-radius: 5px;
	height: fit-content;
	padding: 50px;

	p {
		margin: 0;
	}

	@media only screen and (max-width: 1280px) {
		padding: 30px;
	}

	@media only screen and (max-width: 800px) {
	}

	p {
		text-align: center;
		font-size: 1.5em;
	}
`;
