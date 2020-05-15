import React from "react";
import styled from "styled-components";

type Props = {
	name: string;
	onChangeHandle: (event: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
};

const FileInput: React.FC<Props> = ({name, onChangeHandle, required}) => {
	return (
		<StyledWrapper kind={"white"}>
			<input
				id={name}
				onChange={onChangeHandle}
				name={name}
				type="file"
				required={required}
			/>
			<label htmlFor="imageFile">
				<span className="material-icons">add_photo_alternate</span>Choose File
			</label>
		</StyledWrapper>
	);
};

export default FileInput;

type WrapperProps = {
	kind: "primary" | "white" | "black";
};

const StyledWrapper = styled.div<WrapperProps>`
	z-index: 1;

	input {
		display: none;
	}

	label {
		padding: 0 0.5em;
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
