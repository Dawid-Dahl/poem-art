import React, {useState, useEffect} from "react";
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
	const [imageFile, setImageFile] = useState<{imageFile: FileList | File | null | undefined}>({
		imageFile: null,
	});
	const [poem, setPoem] = useState("");

	const turnFormStateIntoObj = (): UploadInformation => {
		if (title && imageFile && poem) {
			const data = new FormData();
			data.append("fileInput", imageFile);

			return {
				title,
				collection,
				imageFile,
				poem,
			};
		} else {
			console.log("No data sent. Fill in all the required fields.");
		}
	};

	const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setImageFile({...imageFile, imageFile: event.target.files?.[0]});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const res = await fetch(`${process.env.MAIN_FETCH_URL}/api/artPoem/upload`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(turnFormStateIntoObj()),
			});
			const data = await res.json();
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<Navbar />
			<Wrapper>
				<h1 className="registration">Let's Upload!</h1>
				<StyledForm
					action="POST"
					className="form"
					onSubmit={e => {
						e.persist();
						handleSubmit(e);
						e.currentTarget.reset();
					}}
				>
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
					<FileInput name="fileInput" onChangeHandle={onChangeHandle} required />
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
