import React, {useState} from "react";
import styled from "styled-components";
import Button from "../Button";
import TextInput from "../inputs/TextInput";
import TextAreaInput from "../inputs/TextAreaInput";
import {UploadInformation} from "../../types/types";
import {Navbar} from "../Navbar";
import FileInput from "../inputs/FileInput";

const Upload = () => {
	const [title, setTitle] = useState("");
	const [collection, setCollection] = useState("");
	const [poem, setPoem] = useState("");

	const turnFormStateIntoObj = (): UploadInformation => ({
		title,
		collection,
		poem,
	});

	return (
		<>
			<Navbar />
			<Wrapper>
				<h1 className="registration">Let's Upload!</h1>
				<StyledForm>
					<TextInput
						name="title"
						type="text"
						onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
							setTitle(e.target.value)
						}
						required
					/>
					<TextInput
						name="collection"
						type="text"
						onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
							setCollection(e.target.value)
						}
						required
					/>
					<FileInput name="fileInput" required />
					<TextAreaInput
						name="poem"
						onChangeHandle={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
							setPoem(event.target.value)
						}
						required
					/>
					<Button title="Upload" kind="primary" type="submit" />
				</StyledForm>
			</Wrapper>
		</>
	);
};

export default Upload;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	top: 7em;
	position: absolute;
	width: 100%;

	h1 {
		letter-spacing: 1px;
		margin-top: 1em;
	}
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin: 1em 0;
	padding: 1em 0;
	background-color: black;

	h2 {
		color: white;
	}
`;
