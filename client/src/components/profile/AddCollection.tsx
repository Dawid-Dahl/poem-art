import React from "react";
import styled from "styled-components";

type Props = {
	onClickHandler?: (args: any) => any;
};

const AddCollection: React.FC<Props> = ({onClickHandler}) => {
	return (
		<>
			<Wrapper onClick={onClickHandler}>
				<CollectionTitle>
					Add Collection
					<br />
					<span>+</span>
				</CollectionTitle>
			</Wrapper>
		</>
	);
};

export default AddCollection;

const Wrapper = styled.div`
	display: flex;
	background-color: var(--main-btn-color);
	color: white;
	align-items: center;
	justify-content: center;
	height: 200px;
	flex: 1 1 200px;
	border-radius: var(--border-radius);
	padding: 1em;
	margin: 1em;
	text-align: center;
	box-shadow: var(--box-shadow);
	cursor: pointer;
	transition: transform 0.3s;

	span {
		font-size: 2em;
	}

	:hover {
		transform: scale(1.01) rotate(1deg);
	}
`;

const CollectionTitle = styled.h1``;
