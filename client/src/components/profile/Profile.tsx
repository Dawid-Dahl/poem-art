import React, {useEffect} from "react";
import styled from "styled-components";
import ProfilePic from "./ProfilePic";
import CollectionsDisplay from "./CollectionsDisplay";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store";
import {Navbar} from "../Navbar";
import {getAllCollections} from "../../actions/collectionActions";

const Profile = () => {
	const user = useSelector((state: RootState) => state.userReducer.user);
	const collections = useSelector((state: RootState) => state.collectionReducer.collections);

	if (!user) return;
	if (!collections) return;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllCollections());
	}, []);

	return (
		<>
			<Navbar />
			<Wrapper>
				<Greeting>{`Welcome back, ${user.username}!`}</Greeting>
				<ProfilePic />
				<h2>Your Collections</h2>
				<CollectionsDisplay collections={collections} />
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
