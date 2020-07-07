import React from "react";
import styled from "styled-components";

type Props = {
	title: string;
	kind: "primary" | "white" | "black" | "grey" | "delete";
	type: "button" | "submit";
	onClickHandler?: (args: any) => any;
};

const Button: React.FC<Props> = ({title, kind, type, onClickHandler}) => {
	return (
		<>
			<Wrapper kind={kind}>
				<button onClick={onClickHandler} type={type}>
					{title}
				</button>
			</Wrapper>
		</>
	);
};

export default Button;

type WrapperProps = {
	kind: "primary" | "white" | "black" | "grey" | "delete";
};

const Wrapper = styled.div<WrapperProps>`
	z-index: 1;

	button {
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
				: props.kind === "black"
				? "black"
				: props.kind === "grey"
				? "var(--main-grey-color)"
				: props.kind === "delete"
				? "var(--delete-color)"
				: "white"};
		margin: 1em 0;
		transition: all 0.2s;
		cursor: pointer;
		text-decoration: none;
		transition: all 0.2s;
		font-size: 1em;
		color: ${props =>
			props.kind === "primary"
				? "white"
				: props.kind === "white"
				? "black"
				: props.kind === "black"
				? "white"
				: props.kind === "grey"
				? "white"
				: props.kind === "delete"
				? "white"
				: "black"};
		border: black;
		outline: none;

		:hover {
			transform: scale(1.05);
			background-color: ${props => props.kind === "primary" && "var(--hover-btn-color)"};
			box-shadow: ${props =>
				props.kind === "black"
					? "inset 0px 0px 0px 5px var(--dark-grey-color)"
					: props.kind === "grey"
					? "0px 0px 13px 5px #00000005, inset 0px 0px 0px 5px #00000017"
					: "var(--box-shadow), inset 0px 0px 0px 5px #00000017"};
		}
	}
`;
