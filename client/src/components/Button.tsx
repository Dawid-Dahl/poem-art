import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

type Props = {
	title: string;
	linkTo: string;
	onClick?: () => void;
	kind: string;
};

const Button: React.FC<Props> = ({title, linkTo, onClick, kind}) => {
	return (
		<>
			<StyledDiv kind={kind}>
				<Link to={linkTo} onClick={onClick}>
					{title}
				</Link>
			</StyledDiv>
		</>
	);
};

export default Button;

type StyledProps = {
	kind: string;
};

const StyledDiv = styled.div<StyledProps>`
	height: 3em;
	min-width: 7em;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 30px;
	background-color: ${props =>
		props.kind === "primary"
			? "var(--main-btn-color)"
			: props.kind === "white"
			? "white"
			: "white"};
	margin: 0px 10px;
	transition: all 0.2s;
	cursor: pointer;

	a {
		text-decoration: none;
		color: ${props =>
			props.kind === "primary" ? "white" : props.kind === "white" ? "black" : "black"};
		transition: all 0.2s;

		:hover {
			color: ${props =>
				props.kind === "primary"
					? "white"
					: props.kind === "white"
					? "#b3b3b3"
					: "#b3b3b3"};
		}
	}
	:hover {
		transform: scale(1.05);
		background-color: ${props => props.kind === "primary" && "var(--hover-btn-color)"};
		box-shadow: ${props => props.kind === "primary" && "inset 0px 0px 10px 2px #65656542"};
	}
`;
