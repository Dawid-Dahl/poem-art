import React from "react";
import styled from "styled-components";
import ProfilePic from "../profile/ProfilePic";
import CommentBox from "./CommentBox";

const Comment = () => {
	return (
		<>
			<Wrapper>
				<ProfilePicWrapper>
					<ProfilePic size={3} />
				</ProfilePicWrapper>
				<CommentBoxWrapper>
					<CommentBox />
				</CommentBoxWrapper>
			</Wrapper>
		</>
	);
};

export default Comment;

const Wrapper = styled.div``;
const ProfilePicWrapper = styled.div``;
const CommentBoxWrapper = styled.div``;
