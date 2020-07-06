import React from "react";
import styled from "styled-components";
import {Navbar} from "./Navbar";
import ArtPoemGrid from "./art-poem-grid/ArtPoemGrid";
import {selectCollection, deselectCollection} from "../actions/collectionActions";
import SelectElement from "./inputs/SelectElement";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store";

const Main = () => {
	const collections = useSelector((state: RootState) => state.collectionReducer.collections);
	const dispatch = useDispatch();

	return (
		<Wrapper>
			<Navbar />
			<InnerWrapper>
				<SelectElement
					onChangeHandle={(e: React.ChangeEvent<HTMLSelectElement>) =>
						e.target.value === "Social Feed"
							? dispatch(deselectCollection())
							: dispatch(
									selectCollection(
										collections.filter(x => x.name === e.target.value)[0]
									)
							  )
					}
					isSocialFeedSelectable
					collections={collections}
				/>
				<h1>Discover</h1>
				<ArtPoemGrid />
			</InnerWrapper>
		</Wrapper>
	);
};

export default Main;

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const InnerWrapper = styled.div`
	position: absolute;
	top: 8em;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
