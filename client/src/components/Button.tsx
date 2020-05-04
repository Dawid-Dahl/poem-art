import React from "react";
import styled from "styled-components";

type Props = {
	title: string;
	kind: "primary" | "white" | "black";
};

const Button: React.FC<Props> = ({title, kind}) => {
	return (
		<>
			<Wrapper kind={kind}>
				<button type="submit">{title}</button>
			</Wrapper>
		</>
	);
};

export default Button;

type WrapperProps = {
	kind: "primary" | "white" | "black";
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
				: "white"};
		margin: 2em 0;
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
				: "black"};
		border: black;

		:hover {
			transform: scale(1.05);
			background-color: ${props => props.kind === "primary" && "var(--hover-btn-color)"};
			box-shadow: ${props =>
				props.kind === "black"
					? "inset 0px 0px 0px 5px var(--dark-grey-color)"
					: "var(--box-shadow), inset 0px 0px 0px 5px #00000017"};
		}
	}
`;
