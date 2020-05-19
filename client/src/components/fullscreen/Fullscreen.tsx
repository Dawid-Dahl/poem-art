import React from "react";
import styled from "styled-components";
import TopBar from "./TopBar";
import {Navbar} from "../Navbar";
import FullscreenSection from "./FullscreenSection";
import {useLocation} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const backupPoem = {
	id: 0,
	title: "",
	content: "",
	imageUrl: "",
	createdAt: 0,
	likes: 0,
	comments: [],
	userId: "user",
};

const Fullscreen = () => {
	const query = useQuery();

	const artPoem = useSelector(
		(state: RootState) =>
			state.poemReducer.poems?.filter(poem => poem.id === Number(query.get("id")))[0]
	);

	return (
		<>
			<Wrapper>
				<Navbar />
				<TopBar
					title={artPoem ? artPoem.title : ""}
					buttonKind="white"
					backType="history"
				/>
				<FullscreenSection artPoem={artPoem ? artPoem : backupPoem} />
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
