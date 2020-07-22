import React from "react";
import styled from "styled-components";
import ProfilePic from "../profile/ProfilePic";
import CommentBox from "./CommentBox";
import {Link} from "react-router-dom";
import {User, ReduxComment} from "../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {deleteComment} from "../../actions/commentActions";
import {RootState} from "../../store";

type Props = {
	id: ReduxComment["id"];
	comment: ReduxComment["comment"];
	user: User;
	createdAt: ReduxComment["createdAt"];
};

const Comment: React.FC<Props> = ({id, comment, user, createdAt}) => {
	const dispatch = useDispatch();

	const userId = useSelector((state: RootState) => state.userReducer.user?.id);

	return (
		<>
			<Wrapper>
				{user.id === userId && (
					<SpanWrapper>
						<span onClick={e => undefined}>🖋️</span>
						<span
							onClick={e =>
								confirm("Are you sure you want to delete this comment?") &&
								dispatch(deleteComment(id))
							}
						>
							❌
						</span>
					</SpanWrapper>
				)}
				<ProfilePicWrapper>
					<Link to={"/profile"}>
						<ProfilePic size={3} />
					</Link>
				</ProfilePicWrapper>
				<CommentBoxWrapper>
					<CommentBox username={user.username} createdAt={createdAt} comment={comment} />
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
	position: relative;
`;

const SpanWrapper = styled.div`
	position: absolute;
	height: 73%;
	width: 85%;
	text-align: right;
	transition: all 1s;

	@media only screen and (min-width: 1200px) {
		width: 91%;
	}

	&:hover {
		span {
			opacity: 80%;
		}
	}

	span {
		opacity: 0%;
		font-size: 12px;
		transition: all 0.3s;
		z-index: 10;
		margin: 0 0.3em 0 0;
		cursor: pointer;

		@media only screen and (min-width: 1200px) {
			margin: 0 0.6em 0 0;
		}

		&:hover {
			transform: scale(1.1);
		}
	}
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
