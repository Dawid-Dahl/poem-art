import React from "react";
import styled from "styled-components";
import {ReduxCollection} from "../../types/types";
import {selectCollection, deleteCollection} from "../../actions/collectionActions";
import {useDispatch} from "react-redux";

type Props = {
	id: ReduxCollection["id"];
	name: ReduxCollection["name"];
	onClickHandler: (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		id: ReduxCollection["id"]
	) => ReturnType<typeof selectCollection> | undefined;
};

const handleRemoveClick = (
	e: React.MouseEvent<HTMLSpanElement>,
	id: ReduxCollection["id"]
): ReturnType<typeof deleteCollection> | undefined =>
	e.target === e.currentTarget ? deleteCollection(id) : undefined;

const Collection: React.FC<Props> = ({id, name, onClickHandler}) => {
	const dispatch = useDispatch();

	return (
		<>
			<Wrapper>
				<SpanWrapper onClick={e => onClickHandler(e, id)}>
					<span
						onClick={e =>
							confirm(
								"Are you sure you want to delete this collection? All the associated Artpoems will be deleted as well!"
							) && dispatch(handleRemoveClick(e, id))
						}
					>
						❌
					</span>
				</SpanWrapper>
				<CollectionTitle>{name}</CollectionTitle>
			</Wrapper>
		</>
	);
};

export default Collection;

const Wrapper = styled.div`
	display: flex;
	position: relative;
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

const SpanWrapper = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	text-align: right;
	transition: all 1s;

	&:hover {
		span {
			opacity: 80%;
		}
	}

	span {
		position: absolute;
		display: block;
		opacity: 0%;
		top: 5%;
		right: 5%;
		transition: all 0.3s;
		z-index: 10;

		&:hover {
			transform: scale(1.1);
		}
	}
`;

const CollectionTitle = styled.h1``;
