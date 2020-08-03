import React, {useEffect} from "react";
import styled from "styled-components";
import {likePoem} from "../../actions/asyncPoemActions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {ReduxLike, User} from "../../types/types";
import {enableHasUserLikedPoem} from "../../actions/likeActions";

type Props = {
	likes: ReduxLike[];
};

const countLikes = (likes: ReduxLike[]): number => likes.length;

const hasUserLikedPoem = (user: User, likes: ReduxLike[]): boolean =>
	Boolean(likes.find(like => like.userId === user.id));

const LikesSection: React.FC<Props> = ({likes}) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.userReducer.user);

	useEffect(() => {
		if (!user) return;
		if (!likes) return;

		if (hasUserLikedPoem(user, likes)) dispatch(enableHasUserLikedPoem());
	}, [likes]);

	const poemSelected = useSelector((state: RootState) => state.syncPoemReducer.poemSelected);

	return (
		<>
			<Wrapper>
				<p onClick={e => dispatch(likePoem(poemSelected.id))}>{`👍🏻 ${countLikes(
					likes
				)}`}</p>
			</Wrapper>
		</>
	);
};

export default LikesSection;

const Wrapper = styled.div`
	text-align: center;
	margin: 0 0 1em 0;
	background-color: white;
	box-shadow: var(--box-shadow);
	border-radius: 5px;
	height: fit-content;
	padding: 50px;

	p {
		margin: 0;
		cursor: pointer;
		display: inline;
	}

	@media only screen and (max-width: 1280px) {
		padding: 30px;
	}

	@media only screen and (max-width: 800px) {
	}

	p {
		text-align: center;
		font-size: 2em;
	}
`;
