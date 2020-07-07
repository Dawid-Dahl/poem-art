import React, {useEffect} from "react";
import styled from "styled-components";
import ProfilePic from "./ProfilePic";
import CollectionsDisplay from "./CollectionsDisplay";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store";
import {Navbar} from "../Navbar";
import ArtPoemGrid from "../art-poem-grid/ArtPoemGrid";
import {getPoemsByCollection, getPoemsByUserId} from "../../actions/poemActions";
import Button from "../Button";

const Profile: React.FC = () => {
	const user = useSelector((state: RootState) => state.userReducer.user);
	const collections = useSelector((state: RootState) => state.collectionReducer.collections);
	const collectionSelected = useSelector(
		(state: RootState) => state.collectionReducer.collectionSelected
	);
	const dispatch = useDispatch();

	useEffect(() => {
		collectionSelected && dispatch(getPoemsByCollection(collectionSelected));
	}, [collectionSelected]);

	const handleClick = () => {
		if (user) dispatch(getPoemsByUserId(user.id));
	};

	return (
		<>
			<Navbar />
			<Wrapper>
				<Greeting>{`Welcome back, ${user?.username ?? ""}!`}</Greeting>
				<ProfilePic />
				<h2>Your Collections</h2>
				<CollectionsDisplay collections={collections} />
				<h2>Your ArtPoems</h2>
				{collectionSelected && (
					<Button
						title="View All"
						kind="grey"
						type="button"
						onClickHandler={handleClick}
					/>
				)}
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
