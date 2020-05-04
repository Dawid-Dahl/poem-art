import React from "react";
import styled from "styled-components";

type Props = {
	name: string;
	type: string;
	onChangleHandle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	minLength?: number;
	pattern?: string;
	title?: string;
};

const Input: React.FC<Props> = ({
	name,
	type,
	onChangleHandle,
	required,
	pattern,
	title,
	minLength,
}) => (
	<StyledInput
		id={name}
		name={name}
		type={type}
		placeholder={[name[0].toUpperCase(), name.slice(1)].join("")}
		onChange={onChangleHandle}
		required={required}
		pattern={pattern}
		title={title}
		minLength={minLength}
	/>
);

export default Input;

const StyledInput = styled.input`
	border: solid var(--main-grey-color) 1px;
	padding: 1em 3em;
	margin: 1em 0 0 0;
	font-size: 1em;
	border-radius: 5px;
`;
