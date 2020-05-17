import React from "react";
import styled from "styled-components";
import ProfilePic from "./ProfilePic";
import CollectionsDisplay from "./CollectionsDisplay";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Navbar} from "../Navbar";
import {authService} from "../../auth/authService";

const Profile = () => {
	const user = useSelector((state: RootState) => state.userReducer.user);

	if (!user) return authService.logout("You're not allowed to access that page. Please log in!");

	return (
		<>
			<Navbar />
			<Wrapper>
				<Greeting>{`Welcome back, ${user.username}!`}</Greeting>
				<ProfilePic />
				<h2>Your Collections</h2>
				<CollectionsDisplay />
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
`;

const Greeting = styled.h1`
	margin: 5em 0 0.5em 0;
	text-align: center;
`;
