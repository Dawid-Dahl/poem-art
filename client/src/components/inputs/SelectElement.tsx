import React from "react";
import styled from "styled-components";
import OptionElement from "./OptionElement";
import {ReduxCollection} from "../../types/types";

type Props = {
	onChangeHandle: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	isSocialFeedSelectable?: boolean;
	collections: ReduxCollection[];
};

const SelectElement: React.FC<Props> = ({
	onChangeHandle,
	isSocialFeedSelectable = false,
	collections,
}) => (
	<StyledSelectElement onChange={onChangeHandle}>
		<option style={{display: "none"}}>Choose collection 📁</option>
		{isSocialFeedSelectable && <OptionElement key={0} value="Social Feed" />}
		{collections.map(collection => (
			<OptionElement key={collection.id} value={collection.name} />
		))}
	</StyledSelectElement>
);

export default SelectElement;

const StyledSelectElement = styled.select`
	border: solid transparent 1px;
	width: 265px;
	height: 52px;
	padding: 0em 3em;
	margin: 1.5em 0;
	font-size: 1em;
	border-radius: var(--border-radius-inputs);
	cursor: pointer;
	outline: none;
	appearance: none;
	text-align-last: center;

	&:focus {
		box-shadow: 0 0 0 2pt var(--main-btn-color);
	}
`;
