import React from "react";
import styled from "styled-components";
import {likePoem} from "../../actions/asyncPoemActions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";

type Props = {
	likes: number;
};

const LikesSection: React.FC<Props> = ({likes}) => {
	const dispatch = useDispatch();

	const poemSelected = useSelector((state: RootState) => state.syncPoemReducer.poemSelected);

	return (
		<>
			<Wrapper>
				<p onClick={e => dispatch(likePoem(poemSelected.id))}>{`👍🏻 ${likes}`}</p>
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
