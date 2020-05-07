import React from "react";
import styled from "styled-components";

type Props = {
	name: string;
	onChangeHandle: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	required?: boolean;
	minLength?: number;
};

const TextAreaInput: React.FC<Props> = ({name, onChangeHandle, required, minLength}) => (
	<StyledTextArea
		id={name}
		name={name}
		placeholder={[name[0].toUpperCase(), name.slice(1)].join("")}
		onChange={onChangeHandle}
		required={required}
		minLength={minLength}
	/>
);

export default TextAreaInput;

const StyledTextArea = styled.textarea`
	border: solid var(--main-grey-color) 1px;
	height: 20vh;
	min-width: 30%;
	padding: 1em 3em;
	margin: 2.5em 0 0 0;
	font-size: 1em;
	border-radius: 5px;
`;
