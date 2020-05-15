import React, {useState} from "react";
import styled from "styled-components";
import Button from "../Button";
import TextInput from "../inputs/TextInput";
import TextAreaInput from "../inputs/TextAreaInput";
import {ImageFile} from "../../types/types";
import {Navbar} from "../Navbar";
import FileInput from "../inputs/FileInput";
import {refreshAndSetXToken} from "../../utils/utils";

const Upload = () => {
	const [title, setTitle] = useState("");
	const [collection, setCollection] = useState("");
	const [imageFile, setImageFile] = useState<ImageFile>(null);
	const [poem, setPoem] = useState("");

	const turnFormStateIntoObj = () => {
		if (title && imageFile && poem) {
			const data = new FormData();
			data.append("imageFile", imageFile);
			data.append("poemFields", JSON.stringify({title, collection, poem}));

			console.log(data.get("imageFile"));
			console.log(data.get("poemFields"));

			return data;
		} else {
			console.log("No data sent. Fill in all the required fields.");
			return;
		}
	};

	const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setImageFile(event.target.files?.[0]);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			await refreshAndSetXToken(localStorage.getItem("x-refresh-token"));

			const res = await fetch(`${process.env.MAIN_FETCH_URL}/api/poemArt/upload`, {
				method: "POST",
				headers: {"x-token": localStorage.getItem("x-token") ?? "null"},
				body: turnFormStateIntoObj(),
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
					encType="multipart/form-data"
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
					<FileInput name="imageFile" onChangeHandle={onChangeHandle} required />
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
