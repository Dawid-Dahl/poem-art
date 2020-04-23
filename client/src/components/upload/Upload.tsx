import React, {useState} from "react";
import styled from "styled-components";
import Button from "../Button";
import Input from "../Input";
import {UploadInformation} from "../../types/types";
import {Navbar} from "../Navbar";

const Upload = () => {
	const [name, setName] = useState("");
	const [collection, setCollection] = useState("");

	const turnFormStateIntoObj = (): UploadInformation => ({
		name,
		collection,
	});

	return (
		<>
			<Navbar />
			<Wrapper>
				<h1 className="registration">Let's Upload!</h1>
				<UploadWrapper>
					<Input
						name="name"
						type="text"
						onChangleHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
							setName(e.target.value)
						}
						required
					/>
					<Input
						name="collection"
						type="text"
						onChangleHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
							setCollection(e.target.value)
						}
						required
					/>
					<Button title="Upload" kind="primary" />
				</UploadWrapper>
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
	height: 90vh;

	h1 {
		letter-spacing: 1px;
	}
`;

const UploadWrapper = styled.div`
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
