import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import ProfilePic from "../profile/ProfilePic";
import {User, ReduxComment} from "../../types/types";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

type Props = {
	username: User["username"];
	createdAt: ReduxComment["createdAt"];
	comment: ReduxComment["comment"];
};

const CommentBox: React.FC<Props> = ({username, createdAt, comment}) => {
	return (
		<>
			<Wrapper>
				<PresentationWrapper>
					<ProfilePicWrapper>
						<Link to={"/profile"}>
							<ProfilePic size={3} />
						</Link>
					</ProfilePicWrapper>
					<h2>{username}</h2>
					<h3>{dayjs(Date.parse(createdAt)).fromNow()}</h3>
				</PresentationWrapper>
				<p>{comment}</p>
			</Wrapper>
		</>
	);
};

export default CommentBox;

const Wrapper = styled.div`
	border: 1px solid var(--light-grey-color);
	border-radius: var(--border-radius);
	padding: 1em;

	p {
		margin: 0;
		padding: 0;
		font-weight: lighter;
	}
`;

const PresentationWrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 0;

	h2 {
		font-size: 0.9em;
		margin: 0 0.5em 0 0;
		font-weight: 600;
	}

	h3 {
		font-size: 0.8em;
		margin: 0;
		font-weight: lighter;
	}
`;
const ProfilePicWrapper = styled.div`
	margin: 0 0.5em 0.5em 0;

	@media only screen and (min-width: 1000px) {
		display: none;
	}
`;
