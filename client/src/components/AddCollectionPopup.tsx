import React, {useState} from "react";
import styled, {css} from "styled-components";
import TextInput from "./inputs/TextInput";
import Button from "./Button";
import CheckBoxInput from "./inputs/CheckBoxInput";
import {useDispatch, useSelector} from "react-redux";
import {showPopup, hidePopup} from "../actions/popupActions";
import {RootState} from "../store";

type Props = {};

const AddCollectionPopup: React.FC<Props> = () => {
	const [collectionName, setCollectionName] = useState("");
	const [isPublic, setisPublic] = useState(true);

	const dispatch = useDispatch();

	const isShowingPopup = useSelector((state: RootState) => state.popupReducer.isShowingPopup);

	const handleClick = () => dispatch(hidePopup());

	return (
		<>
			<Wrapper active={isShowingPopup}>
				<StyledForm>
					<h2>Add Collection</h2>
					<NameRow>
						<p>Name</p>
						<div>
							<TextInput
								name="Enter Name"
								value={collectionName}
								type="text"
								onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
									setCollectionName(e.target.value)
								}
								required
							/>
						</div>
					</NameRow>
					<PublicRow>
						<p>Public</p>
						<CheckBoxInput
							name="public"
							isChecked={isPublic}
							checked
							onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
								setisPublic(e.target.checked)
							}
						/>
					</PublicRow>
					<ButtonRow>
						<Button
							title="Cancel"
							kind="grey"
							type="button"
							onClickHandler={() => handleClick()}
						/>
						<Button title="Add" kind="primary" type="submit" />
					</ButtonRow>
				</StyledForm>
			</Wrapper>
		</>
	);
};

type WrapperProps = {
	active: boolean;
};

const Wrapper = styled.div<WrapperProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
	position: absolute;

	${props =>
		props.active
			? css`
					display: flex;
			  `
			: css`
					display: none;
			  `}
`;

const StyledForm = styled.form`
	min-width: 35%;
	position: fixed;
	padding: 2em;
	background-color: white;
	border-radius: var(--border-radius);
	box-shadow: 1px 0px 20px 6px #00000045;
	z-index: 20;

	h2 {
		text-align: center;
		color: black;
	}

	p {
		color: black;
	}

	@media only screen and (max-width: 500px) {
		width: 100%;
		border-radius: 0;
		align-self: stretch;
	}
`;

const NameRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 3em;
	padding-top: 2em;
	border-top: 1px var(--main-grey-color) solid;

	p {
		padding-right: 30px;
	}

	div {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media only screen and (max-width: 500px) {
		margin: 2em;

		input {
			width: 50%;
			margin: 0;
		}
	}
`;

const PublicRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	margin-top: 3em;
	border-top: 1px var(--main-grey-color) solid;

	p {
		padding-right: 30px;
	}

	input {
		margin: 0;
	}

	@media only screen and (max-width: 500px) {
		margin: 2em;
	}
`;

const ButtonRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;

export default AddCollectionPopup;
