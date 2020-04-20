import React, {useState} from "react";
import styled from "styled-components";
import {authService} from "../auth/authService";
import Button from "./Button";

export const Navbar: React.FC = () => {
	const [rolldownState, setRolldownState] = useState(false);

	return (
		<>
			<Wrapper>
				<Logo>imageArt.</Logo>
				<Buttons>
					<Button title="Upload" linkTo="#" kind="white" />
					<Button title="Profile" linkTo="#" kind="white" />
					<Button
						title="Logout"
						linkTo="login"
						onClick={() => {
							authService.removeUserFromState();
							authService.removeTokensFromLocalStorage();
						}}
						kind="white"
					/>
				</Buttons>
				<Hamburger active={rolldownState} onClick={() => setRolldownState(!rolldownState)}>
					<div></div>
					<div></div>
					<div></div>
				</Hamburger>
				<Rolldown active={rolldownState} />
			</Wrapper>
			<RolldownButtons active={rolldownState}>
				<Button title="Upload" linkTo="#" kind="white" />
				<Button title="Profile" linkTo="#" kind="white" />
				<Button
					title="Logout"
					linkTo="login"
					onClick={() => {
						authService.removeUserFromState();
						authService.removeTokensFromLocalStorage();
					}}
					kind="white"
				/>
			</RolldownButtons>
		</>
	);
};

const Wrapper = styled.div`
	width: 100vw;
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
	display: flex;

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

	@media only screen and (max-width: 500px) {
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
		height: ${props => (props.active ? "70%" : "0%")};
	}

	@media only screen and (max-width: 500px) {
		height: ${props => (props.active ? "60%" : "0%")};
	}
`;

const RolldownButtons = styled.div<RolldownProps>`
	display: none;
	position: absolute;
	top: 120px;
	transform: ${props => (props.active ? "scale(1.3)" : "scale(0)")};
	transform-origin: 50% 10%;
	opacity: ${props => (props.active ? "100%" : "0%")};
	transition: ${props => (props.active ? "all 1s 0.3s;" : "all 1s;")};
	z-index: 1;

	@media only screen and (max-width: 800px) {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		height: 300px;
		transform: ${props => (props.active ? "scale(1.3)" : "scale(0)")};
	}

	@media only screen and (max-width: 500px) {
		height: 250px;
		transform: ${props => (props.active ? "scale(1)" : "scale(0)")};
	}
`;
