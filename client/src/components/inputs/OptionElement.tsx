import React from "react";
import styled from "styled-components";

type Props = {
	value: string;
	disabled?: boolean;
};

const OptionElement: React.FC<Props> = ({value, disabled}) => (
	<StyledOption disabled={disabled} value={value}>
		{value}
	</StyledOption>
);

export default OptionElement;

const StyledOption = styled.option`
	border: solid var(--main-grey-color) 1px;
	padding: 1em 3em;
	margin: 1em 0 0 0;
	font-size: 1em;
	border-radius: 5px;
`;
