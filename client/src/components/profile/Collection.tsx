import React from "react";
import styled from "styled-components";

type Props = {
	name: string;
};

const Collection: React.FC<Props> = ({name}) => {
	return (
		<>
			<Wrapper>
				<CollectionTitle>{name}</CollectionTitle>
			</Wrapper>
		</>
	);
};

export default Collection;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 200px;
	flex: 1 1 200px;
	border-radius: var(--border-radius);
	background-color: white;
	padding: 1em;
	margin: 1em;
	text-align: center;
	box-shadow: var(--box-shadow);
	cursor: pointer;
	transition: transform 0.3s;

	:hover {
		transform: scale(1.01) rotate(1deg);
	}
`;

const CollectionTitle = styled.h1``;
