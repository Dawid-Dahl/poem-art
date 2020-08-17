import React, {useEffect} from "react";
import styled from "styled-components";
import ProfilePic from "./ProfilePic";
import {useDispatch, useSelector} from "react-redux";
import ArtPoemGrid from "../art-poem-grid/ArtPoemGrid";
import {getPoemsByUserId} from "../../actions/asyncPoemActions";
import {useQuery} from "../../custom-hooks/useQuery";
import {getUser} from "../../actions/userActions";
import {RootState} from "../../store";

const GeneralProfile: React.FC = () => {
	const query = useQuery();

	const userId = query.get("id");

	const dispatch = useDispatch();

	const profileUser = useSelector((state: RootState) => state.profileReducer.profileUser);

	useEffect(() => {
		if (userId) dispatch(getUser(userId));
	}, []);

	useEffect(() => {
		if (userId) dispatch(getPoemsByUserId(userId));
	}, []);

	return (
		<>
			<Wrapper>
				<ProfilePicWrapper>
					<ProfilePic size={8} isAnimating user={profileUser} />
				</ProfilePicWrapper>
				<h1>{`${profileUser?.username}'s ArtPoems`} </h1>
				<ArtPoemGrid />
			</Wrapper>
		</>
	);
};

export default GeneralProfile;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 8em 0 0.5em 0;

	h1 {
		margin: 1.5em;
	}
`;

const ProfilePicWrapper = styled.div`
	margin: 1.5em 0 0 0;
`;

const Greeting = styled.h1`
	margin: 5em 0 0.5em 0;
	text-align: center;
`;
