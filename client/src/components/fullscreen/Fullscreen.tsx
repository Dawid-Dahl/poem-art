import React from "react";
import styled from "styled-components";
import TopBar from "./TopBar";
import {Navbar} from "../Navbar";
import FullscreenSection from "./FullscreenSection";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Loading from "../Loading";

const Fullscreen: React.FC = () => {
	const isLoading = useSelector((state: RootState) => state.loadingReducer.isLoading);
	const selectedArtPoem = useSelector((state: RootState) => state.poemReducer.poemSelected);

	return (
		<>
			<Wrapper>
				<Navbar />
				{isLoading ? <Loading /> : <FullscreenSection />}
			</Wrapper>
		</>
	);
};

export default Fullscreen;

const Wrapper = styled.div`
	position: absolute;
	top: 7em;
	width: 100%;

	/* @media only screen and (max-width: 500px) {
		div {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
	} */
`;
