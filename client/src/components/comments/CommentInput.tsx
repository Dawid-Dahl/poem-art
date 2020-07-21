import React, {useState} from "react";
import styled from "styled-components";
import TextInput from "../inputs/TextInput";
import ProfilePic from "../profile/ProfilePic";
import {Link} from "react-router-dom";

const CommentInput = () => {
	const [comment, setComment] = useState("");

	return (
		<>
			<Wrapper>
				<Link to={"/profile"}>
					<ProfilePicWrapper>
						<ProfilePic size={3} />
					</ProfilePicWrapper>
				</Link>
				<TextInputWrapper>
					<TextInput
						name="Add a comment ✍🏻"
						value={comment}
						type="text"
						onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
							setComment(e.target.value)
						}
					/>
				</TextInputWrapper>
			</Wrapper>
		</>
	);
};

export default CommentInput;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	border-top: var(--main-grey-color) 1px solid;
`;

const ProfilePicWrapper = styled.div`
	margin: 0 0 0 1em;
`;

const TextInputWrapper = styled.div`
	width: 100%;
	margin: 1em;
`;
