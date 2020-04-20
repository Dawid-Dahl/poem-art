import React from "react";
import styled from "styled-components";
import {CollectionSelector} from "./CollectionSelector";
import {Navbar} from "./Navbar";

const Main = () => {
	return (
		<Wrapper>
			<Navbar />
			<CollectionSelector />
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

	h1 {
		padding: 0;
	}
`;
