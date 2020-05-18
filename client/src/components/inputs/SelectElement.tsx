import React from "react";
import styled from "styled-components";
import OptionElement from "./OptionElement";
import {ReduxCollection} from "../../types/types";

const fakeCollection = ["My Collection", "Sad Poems", "Cool Stuff"];

type Props = {
	onChangeHandle: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	collections: ReduxCollection[];
};

const SelectElement: React.FC<Props> = ({onChangeHandle, collections}) => (
	<StyledSelectElement onChange={onChangeHandle}>
		<option style={{display: "none"}}>Choose collection 📁</option>
		{collections.map(collection => (
			<OptionElement key={collection.id} value={collection.name} />
		))}
	</StyledSelectElement>
);

export default SelectElement;

const StyledSelectElement = styled.select`
	border: solid var(--main-grey-color) 1px;
	width: 265px;
	height: 52px;
	padding: 0em 3em;
	margin: 1.5em 0 0 0;
	font-size: 1em;
	border-radius: var(--border-radius-inputs);
	cursor: pointer;
	outline: none;
	appearance: none;

	&:focus {
		box-shadow: 0 0 0 2pt var(--main-btn-color);
	}
`;
