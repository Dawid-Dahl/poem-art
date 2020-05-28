import React from "react";
import styled from "styled-components";
import {CollectionSelector} from "./CollectionSelector";
import {Navbar} from "./Navbar";
import ArtPoemGrid from "./art-poem-grid/ArtPoemGrid";

const Main = () => {
	return (
		<Wrapper>
			<Navbar />
			<InnerWrapper>
				<CollectionSelector />
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
	top: 7em;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
