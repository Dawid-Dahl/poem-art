import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {RootState} from "../../store";

import {useSelector, useDispatch} from "react-redux";
import ProfilePic from "../profile/ProfilePic";
import {getUser} from "../../actions/userActions";
import {User} from "../../types/types";
import {Link} from "react-router-dom";

type Props = {};

const PoemAuthorSection: React.FC<Props> = () => {
	const selectedArtPoem = useSelector((state: RootState) => state.syncPoemReducer.poemSelected);
	const authorUser = useSelector((state: RootState) => state.profileReducer.profileUser);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUser(selectedArtPoem.userId));
	}, [selectedArtPoem]);

	return (
		<>
			<Wrapper>
				<Link to={`/profile?id=${authorUser?.id}`} style={{textDecoration: "none"}}>
					<InnerWrapper>
						<ProfilePic size={3} user={authorUser} />
						<h2>{authorUser?.username}</h2>
					</InnerWrapper>
				</Link>
			</Wrapper>
		</>
	);
};

export default PoemAuthorSection;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const InnerWrapper = styled.div`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	background-color: #00000029;
	text-align: center;
	padding: 0.2em;

	h2 {
		color: white;
		margin: 0 0.5em 0 0.5em;
		font-size: 1em;
		padding: 0;
	}
`;
