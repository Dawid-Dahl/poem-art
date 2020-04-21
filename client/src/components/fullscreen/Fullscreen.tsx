import React from "react";
import styled from "styled-components";
import TopBar from "./TopBar";
import {Navbar} from "../Navbar";
import FullscreenPicture from "./FullscreenPicture";

const Fullscreen = () => {
	return (
		<>
			<Wrapper>
				<Navbar />
				<TopBar />
				<FullscreenPicture />
			</Wrapper>
		</>
	);
};

export default Fullscreen;

const Wrapper = styled.div`
	position: absolute;
	top: 7em;
	width: 100%;
`;
