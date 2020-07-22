import React, {useState} from "react";
import styled from "styled-components";
import TextInput from "../inputs/TextInput";
import ProfilePic from "../profile/ProfilePic";
import {Link} from "react-router-dom";
import CommentSubmitSection from "./CommentSubmitSection";
import {useDispatch} from "react-redux";
import {postComment} from "../../actions/commentActions";

const CommentInput = () => {
	const [comment, setComment] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			dispatch(postComment(comment));

			setComment("");
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<StyledForm action="POST" onSubmit={e => handleSubmit(e)}>
				<CommentInputSectionWrapper>
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
				</CommentInputSectionWrapper>
				<CommentSubmitSectionWrapper className="comment-submit-section-wrapper">
					<CommentSubmitSection />
				</CommentSubmitSectionWrapper>
			</StyledForm>
		</>
	);
};

export default CommentInput;

const StyledForm = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	border-top: var(--light-grey-color) 1px solid;

	&:focus-within {
		.comment-submit-section-wrapper {
			display: block;
		}
	}
`;

const CommentInputSectionWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const CommentSubmitSectionWrapper = styled.div`
	display: none;
	width: 100%;
`;

const ProfilePicWrapper = styled.div`
	margin: 0 0 0 1em;
`;

const TextInputWrapper = styled.div`
	width: 100%;
	margin: 1em 1em 0.5em 1em;

	@media only screen and (max-width: 400px) {
		input {
			padding: 0.2em 0.5em;
			width: 90%;
		}
	}
`;
