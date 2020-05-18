import React from "react";
import styled from "styled-components";
import Collection from "./Collection";
import AddCollection from "./AddCollection";
import {useDispatch} from "react-redux";
import {showPopup} from "../../actions/popupActions";
import {ReduxCollection} from "../../types/types";

type Props = {
	collections: ReduxCollection[];
};

const CollectionsDisplay: React.FC<Props> = ({collections}) => {
	const dispatch = useDispatch();

	const onClickHandler = () => dispatch(showPopup());

	return (
		<>
			<Wrapper>
				{collections.map(collection => (
					<Collection key={collection.id} name={collection.name} />
				))}
				<AddCollection onClickHandler={onClickHandler} />
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
