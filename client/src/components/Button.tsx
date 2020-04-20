import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

type Props = {
	title: string;
	linkTo: string;
	color?: string;
};

const Button: React.FC<Props> = ({title, linkTo, color}) => {
	return (
		<>
			<StyledDiv color={color}>
				<Link to={linkTo}>{title}</Link>
			</StyledDiv>
		</>
	);
};

export default Button;

const StyledDiv = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	a {
		max-width: 5em;
		display: inline-block;
		padding: 15px 30px;
		margin: 0px 10px;
		color: black;
		border-radius: 30px;
		background-color: ${props => (props.color ? props.color : "white")};
		text-decoration: none;
		transition: color 0.2s;
		cursor: pointer;

		:hover {
			color: #b3b3b3;
		}
	}
`;
