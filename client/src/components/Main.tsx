import React, {useEffect} from "react";
import styled from "styled-components";
import {Navbar} from "./Navbar";
import ArtPoemGrid from "./art-poem-grid/ArtPoemGrid";
import {selectCollection} from "../actions/collectionActions";
import SelectElement from "./inputs/SelectElement";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store";
import {getPoemsByCollection, getPoems} from "../actions/poemActions";

const Main = () => {
	const collections = useSelector((state: RootState) => state.collectionReducer.collections);
	const collectionSelected = useSelector(
		(state: RootState) => state.collectionReducer.collectionSelected
	);
	const dispatch = useDispatch();

	useEffect(() => {
		collectionSelected && dispatch(getPoemsByCollection(collectionSelected));
	}, [collectionSelected]);

	const handleSelectCollection = (
		e: React.ChangeEvent<HTMLSelectElement>
	): ReturnType<typeof selectCollection> | ReturnType<typeof getPoems> =>
		e.target.value === "Social Feed"
			? getPoems()
			: selectCollection(collections.filter(x => x.name === e.target.value)[0]);

	return (
		<Wrapper>
			<Navbar />
			<InnerWrapper>
				<SelectElement
					onChangeHandle={(e: React.ChangeEvent<HTMLSelectElement>) =>
						dispatch(handleSelectCollection(e))
					}
					isSocialFeedSelectable
					collections={collections}
				/>
				{collectionSelected ? <h1></h1> : <h1>Discover</h1>}
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

	h1 {
		margin: 0 0 0.5em 0;
	}
`;
