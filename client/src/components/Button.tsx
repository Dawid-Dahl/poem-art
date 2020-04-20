import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

type Props = {
	title: string;
	linkTo: string;
	onClick?: () => void;
	kind: string;
	customization?: string;
};

const Button: React.FC<Props> = ({title, linkTo, onClick, kind, customization}) => {
	return (
		<>
			<StyledDiv kind={kind} customization={customization}>
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
	customization?: string;
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
	}
	:hover {
		transform: scale(1.05);
		background-color: ${props => props.kind === "primary" && "var(--hover-btn-color)"};
		box-shadow: inset 0px 0px 0px 5px #00000017;
	}

	/* This media query is here to make sure that the desktop nav buttons don't take up space at tablet and mobile devices. */

	@media only screen and (max-width: 700px) {
		display: ${props => props.customization === "desktopButton" && "none"};
	}
`;
