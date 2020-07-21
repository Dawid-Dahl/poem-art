import React from "react";
import styled from "styled-components";
import ProfilePic from "../profile/ProfilePic";

const CommentBox = () => {
	return (
		<>
			<Wrapper>
				<h2>Integral Monastery</h2>
				<h3>1h</h3>
				<p>Test Comment</p>
			</Wrapper>
		</>
	);
};

export default CommentBox;

const Wrapper = styled.div``;
