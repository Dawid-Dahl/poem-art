import React, {useState, useEffect} from "react";
import styled, {css} from "styled-components";
import TextInput from "../inputs/TextInput";
import Button from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {hidePopup} from "../../actions/popupActions";
import {RootState} from "../../store";
import {EditPoemFormObject} from "../../types/types";
import TextAreaInput from "../inputs/TextAreaInput";
import {editPoem} from "../../actions/poemActions";
import FileInput from "../inputs/FileInput";
import {ImageFile} from "../../types/types";

const EditPoemPopup: React.FC = () => {
	const poemSelected = useSelector((state: RootState) => state.poemReducer.poemSelected);
	const editPoemPopup = useSelector((state: RootState) => state.popupReducer.editPoemPopup);

	useEffect(() => {
		setpoemTitle(poemSelected.title);
		setPoemContent(poemSelected.content);
	}, [poemSelected]);

	const [poemTitle, setpoemTitle] = useState(poemSelected.title);
	const [imageFile, setImageFile] = useState<ImageFile>(null);
	const [poemContent, setPoemContent] = useState(poemSelected.content);

	const dispatch = useDispatch();

	const turnFormStateIntoObj = (
		poemId: number,
		poemTitle: string,
		poemContent: string
	): EditPoemFormObject | undefined => {
		if (poemTitle && poemContent) {
			return {
				poemId,
				poemTitle,
				poemContent,
			};
		} else {
			console.log("No data sent. Fill in all the required fields.");
			return;
		}
	};

	const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setImageFile(event.target.files?.[0]);
	};

	const handleClick = () => {
		setpoemTitle(poemSelected.title);
		setPoemContent(poemSelected.content);
		dispatch(hidePopup());
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			const editPoemPayload = turnFormStateIntoObj(poemSelected.id, poemTitle, poemContent);

			if (!editPoemPayload) return;

			dispatch(editPoem(editPoemPayload));

			setpoemTitle(poemSelected.title);
			setPoemContent(poemSelected.content);
			dispatch(hidePopup());
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<StyledForm action="POST" onSubmit={e => handleSubmit(e)} active={editPoemPopup.active}>
				<h2>{editPoemPopup.active ? editPoemPopup.name : ""}</h2>
				<Row>
					<p>Edit Title</p>
					<div>
						<TextInput
							value={poemTitle}
							type="text"
							onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
								setpoemTitle(e.target.value)
							}
							required
						/>
					</div>
				</Row>
				<Row>
					<p>Update Art</p>
					<div>
						<FileInput
							name="imageFile"
							kind="black"
							isFileSelected={Boolean(imageFile)}
							onChangeHandle={onChangeHandle}
						/>
					</div>
				</Row>
				<Row>
					<p>Edit ArtPoem</p>
					<div>
						<TextAreaInput
							value={poemContent}
							onChangeHandle={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
								setPoemContent(e.target.value)
							}
							required
						/>
					</div>
				</Row>
				<ButtonRow>
					<Button title="Cancel" kind="grey" type="button" onClickHandler={handleClick} />
					<Button title="Edit" kind="primary" type="submit" />
				</ButtonRow>
			</StyledForm>
		</>
	);
};

export default EditPoemPopup;

type StyledFormProps = {
	active: boolean;
};

const StyledForm = styled.form<StyledFormProps>`
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

	${props =>
		props.active
			? css`
					display: block;
			  `
			: css`
					display: none;
			  `}

	@media only screen and (max-width: 500px) {
		width: 100%;
		border-radius: 0;
		align-self: stretch;
	}
`;

const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 3em;
	padding-top: 2em;
	border-top: 1px var(--light-grey-color) solid;

	p {
		padding-right: 30px;
		width: 20%;
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

const ButtonRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;
