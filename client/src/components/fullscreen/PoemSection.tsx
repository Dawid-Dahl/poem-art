import React from "react";
import styled from "styled-components";
import store from "../../store";
import {showEditPoemPopup} from "../../actions/popupActions";

type Props = {
	poem: string;
};

const onClickHandle = () => store.dispatch(showEditPoemPopup());

export const PoemSection: React.FC<Props> = ({poem}) => {
	return (
		<>
			<Wrapper>
				<span className="material-icons" onClick={onClickHandle}>
					edit
				</span>
				<p>{poem}</p>
			</Wrapper>
		</>
	);
};

export default PoemSection;

const Wrapper = styled.div`
	position: relative;
	grid-area: PoemSection;
	background-color: white;
	box-shadow: var(--box-shadow);
	border-radius: 5px;
	height: fit-content;

	span {
		position: absolute;
		margin: 5px;
		top: 0;
		right: 0;
		cursor: pointer;
	}

	p {
		padding: 50px;
		text-align: center;
		font-size: 1.5em;
	}
`;
