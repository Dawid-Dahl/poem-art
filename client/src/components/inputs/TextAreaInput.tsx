import React from "react";
import styled from "styled-components";

type Props = {
	name: string;
	value: string;
	onChangeHandle: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	required?: boolean;
	minLength?: number;
};

const TextAreaInput: React.FC<Props> = ({name, value, onChangeHandle, required, minLength}) => (
	<StyledTextArea
		id={name}
		name={name}
		value={value}
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
	min-width: 20%;
	padding: 1em 3em;
	font-size: 1em;
	border-radius: 5px;
`;
