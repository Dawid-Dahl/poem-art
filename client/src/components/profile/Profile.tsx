import React from "react";
import styled from "styled-components";
import ProfilePic from "./ProfilePic";
import CollectionsDisplay from "./CollectionsDisplay";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Navbar} from "../Navbar";
import ArtPoemGrid from "../art-poem-grid/ArtPoemGrid";

const Profile: React.FC = () => {
	const user = useSelector((state: RootState) => state.userReducer.user);
	const collections = useSelector((state: RootState) => state.collectionReducer.collections);

	return (
		<>
			<Navbar />
			<Wrapper>
				<Greeting>{`Welcome back, ${user?.username ?? ""}!`}</Greeting>
				<ProfilePic />
				<h2>Your Collections</h2>
				<CollectionsDisplay collections={collections} />
				<h2>Your ArtPoems</h2>
				<ArtPoemGrid />
			</Wrapper>
		</>
	);
};

export default Profile;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h2 {
		margin: 2em 0;
	}
`;

const Greeting = styled.h1`
	margin: 5em 0 0.5em 0;
	text-align: center;
`;
