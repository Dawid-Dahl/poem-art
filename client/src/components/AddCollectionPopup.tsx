import React, {useState} from "react";
import styled, {css} from "styled-components";
import TextInput from "./inputs/TextInput";
import Button from "./Button";
import CheckBoxInput from "./inputs/CheckBoxInput";
import {useDispatch, useSelector} from "react-redux";
import {hidePopup} from "../actions/popupActions";
import {RootState} from "../store";
import {refreshAndSetXToken, flashMessage} from "../utils/utils";
import {addCollection} from "../actions/collectionActions";

type Props = {};

const AddCollectionPopup: React.FC<Props> = () => {
	const [collectionName, setCollectionName] = useState("");
	const [isPublic, setisPublic] = useState(true);

	const dispatch = useDispatch();

	const isShowingPopup = useSelector((state: RootState) => state.popupReducer.isShowingPopup);

	const turnFormStateIntoObj = (collectionName: string, isPublic: boolean) => {
		if (collectionName) {
			return {
				collectionName,
				isPublic,
			};
		} else {
			console.log("No data sent. Fill in all the required fields.");
			return;
		}
	};

	const handleClick = () => {
		setCollectionName("");
		dispatch(hidePopup());
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			const collectionPayload = turnFormStateIntoObj(collectionName, isPublic);

			if (!collectionPayload) return;

			await refreshAndSetXToken(localStorage.getItem("x-refresh-token"));

			const res = await fetch(`${process.env.MAIN_FETCH_URL}/api/collections/add`, {
				method: "POST",
				headers: {
					"x-token": localStorage.getItem("x-token") ?? "null",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(collectionPayload),
			});

			const data = await res.json();

			setCollectionName("");

			const {id, name, public: _public} = JSON.parse(JSON.parse(data.payload).collection);

			dispatch(
				addCollection({
					id,
					name,
					public: _public,
				})
			);
			dispatch(hidePopup());

			flashMessage(JSON.parse(data.payload).message);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<Wrapper active={isShowingPopup}>
				<StyledForm action="POST" onSubmit={e => handleSubmit(e)}>
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
							onClickHandler={handleClick}
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
	min-width: 30%;
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
	border-top: 1px var(--light-grey-color) solid;

	p {
		padding-right: 30px;
	}

	div {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	input {
		border: var(--light-grey-color) 2px solid;
		outline: none;

		&:focus {
			box-shadow: 0 0 0 2pt var(--main-btn-color);
		}
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
	padding-top: 2em;
	border-top: 1px var(--light-grey-color) solid;

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
