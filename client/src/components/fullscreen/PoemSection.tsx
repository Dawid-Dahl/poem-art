import React from "react";
import styled from "styled-components";

type Props = {
	poem: string;
};

export const PoemSection: React.FC<Props> = ({poem}) => {
	return (
		<>
			<Wrapper>
				<p>{poem}</p>
			</Wrapper>
		</>
	);
};

export default PoemSection;

const Wrapper = styled.div`
	grid-area: PoemSection;
	background-color: white;
	box-shadow: var(--box-shadow);
	border-radius: 5px;
	height: fit-content;

	p {
		padding: 50px;
		text-align: center;
		font-size: 1.5em;
	}
`;
