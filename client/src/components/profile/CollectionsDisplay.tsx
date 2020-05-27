import React from "react";
import styled from "styled-components";
import Collection from "./Collection";
import AddCollection from "./AddCollection";
import {useDispatch} from "react-redux";
import {showPopup} from "../../actions/popupActions";
import {ReduxCollection} from "../../types/types";
import {selectCollection} from "../../actions/collectionActions";

type Props = {
	collections: ReduxCollection[];
};

const CollectionsDisplay: React.FC<Props> = ({collections}) => {
	const dispatch = useDispatch();

	const onClickHandlerSelectCollection = (id: ReduxCollection["id"]) =>
		dispatch(selectCollection(collections.filter(x => x.id === id)[0]));

	const onClickHandlerAddCollection = () => dispatch(showPopup());

	return (
		<>
			<Wrapper>
				{collections.map(collection => (
					<Collection
						key={collection.id}
						id={collection.id}
						name={collection.name}
						onClickHandler={onClickHandlerSelectCollection}
					/>
				))}
				<AddCollection onClickHandler={onClickHandlerAddCollection} />
			</Wrapper>
		</>
	);
};

export default CollectionsDisplay;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	background-color: lightgrey;
	width: 90%;
	border-radius: var(--border-radius);
`;
