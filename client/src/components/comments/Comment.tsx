import React from "react";
import styled from "styled-components";
import ProfilePic from "../profile/ProfilePic";
import CommentBox from "./CommentBox";
import {Link} from "react-router-dom";

const Comment = () => {
	return (
		<>
			<Wrapper>
				<ProfilePicWrapper>
					<Link to={"/profile"}>
						<ProfilePic size={3} />
					</Link>
				</ProfilePicWrapper>
				<CommentBoxWrapper>
					<CommentBox />
				</CommentBoxWrapper>
			</Wrapper>
		</>
	);
};

export default Comment;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const ProfilePicWrapper = styled.div`
	margin: 0 0 0 1em;

	@media only screen and (max-width: 1000px) {
		display: none;
	}
`;
const CommentBoxWrapper = styled.div`
	width: 100%;
	margin: 0.5em 1em;
`;
