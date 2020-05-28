import React from "react";
import styled from "styled-components";
import {ReduxCollection} from "../../types/types";
import {selectCollection} from "../../actions/collectionActions";

type Props = {
	id: ReduxCollection["id"];
	name: ReduxCollection["name"];
	onClickHandler: (id: string) => ReturnType<typeof selectCollection>;
};

const Collection: React.FC<Props> = ({id, name, onClickHandler}) => {
	return (
		<>
			<Wrapper onClick={() => onClickHandler(id)}>
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
	margin: 1em 2em;
	text-align: center;
	box-shadow: var(--box-shadow);
	cursor: pointer;
	transition: transform 0.3s;

	:hover {
		transform: scale(1.01) rotate(1deg);
	}
`;

const CollectionTitle = styled.h1``;
