import React, {useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {authService} from "../auth/authService";

export const Navbar: React.FC = () => {
	const [rolldownState, setRolldownState] = useState(false);

	return (
		<>
			<Wrapper>
				<Logo>imageArt.</Logo>
				<Buttons>
					<Link to="#">Upload</Link>
					<Link to="#">Profile</Link>
					<Link
						to="/login"
						onClick={() => {
							authService.removeUserFromState();
							authService.removeTokensFromLocalStorage();
						}}
					>
						Logout
					</Link>
				</Buttons>
				<Hamburger active={rolldownState} onClick={() => setRolldownState(!rolldownState)}>
					<div></div>
					<div></div>
					<div></div>
				</Hamburger>
				<Rolldown active={rolldownState} />
			</Wrapper>
			<RolldownButtons active={rolldownState}>
				<Link to="#">Upload</Link>
				<Link to="#">Profile</Link>
				<Link
					to="/login"
					onClick={() => {
						authService.removeUserFromState();
						authService.removeTokensFromLocalStorage();
					}}
				>
					Logout
				</Link>
			</RolldownButtons>
		</>
	);
};

const Wrapper = styled.div`
	width: 100%;
	background-color: var(--main-color);
	height: 8.05em;
	display: flex;
	align-items: center;
	justify-content: space-around;
	z-index: 1;

	@media only screen and (max-width: 1280px) {
		justify-content: space-between;
	}
`;

const Logo = styled.p`
	color: white;
	font-size: 2em;
	margin-left: 40px;
`;

const Buttons = styled.div`
	transition: all 0.4s;
	transform-origin: 80% 50%;
	opacity: 100%;

	a {
		max-width: 100px;
		display: inline-block;
		padding: 15px 30px;
		margin: 0px 10px;
		color: black;
		border-radius: 30px;
		background-color: white;
		text-decoration: none;
		transition: color 0.2s;
		cursor: pointer;

		:hover {
			color: #b3b3b3;
		}
	}

	@media only screen and (max-width: 800px) {
		transform: scale(0);
		opacity: 0%;
	}
`;

type RolldownProps = {
	active: boolean;
};

const Hamburger = styled.div<RolldownProps>`
	position: absolute;
	display: flex;
	transform: ${props => (props.active ? "rotate(90deg) scale(1)" : "rotate(90deg) scale(1)")};
	right: 10%;
	opacity: 0%;
	transition: all 0.4s 0.1s;
	cursor: pointer;

	div {
		background-color: white;
		height: 50px;
		width: 10px;
		margin: 5px;
	}

	@media only screen and (max-width: 800px) {
		opacity: 100%;
		transition: all 0.4s;
		transform: ${props => (props.active ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(1)")};
	}

	@media only screen and (max-width: 450px) {
		transform: ${props =>
			props.active ? "rotate(0deg) scale(0.7)" : "rotate(90deg) scale(0.7)"};
	}
`;

const Rolldown = styled.div<RolldownProps>`
	height: ${props => (props.active ? "70%" : "0%")};
	display: none;
	position: absolute;
	width: 100%;
	top: 8em;
	z-index: -1;
	background-color: var(--main-color);
	transition: 1s cubic-bezier(0.85, 0, 0.15, 1);

	@media only screen and (max-width: 800px) {
		display: block;
	}
`;

const RolldownButtons = styled.div<RolldownProps>`
	position: absolute;
	top: 8em;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	height: 350px;
	transform-origin: 50% 10%;
	transition: ${props => (props.active ? "all 1s 0.3s;" : "all 1s;")};
	transform: ${props => (props.active ? "scale(1)" : "scale(0)")};
	opacity: ${props => (props.active ? "100%" : "0%")};
	z-index: 1;

	a {
		display: none;
		color: black;
		border-radius: 30px;
		background-color: white;
		text-decoration: none;
		transition: all 0.2s;
		cursor: pointer;

		:hover {
			color: #b3b3b3;
		}
	}

	@media only screen and (max-width: 800px) {
		height: 400px;

		a {
			display: block;
			padding: 25px 60px;
			margin: 20px 20px;
		}
	}

	@media only screen and (max-width: 450px) {
		height: 350px;

		a {
			display: block;
			padding: 15px 30px;
			margin: 20px 20px;
		}
	}
`;
