import React from "react";
import styled from "styled-components";
import Button from "./Button";

export const CollectionSelector = () => {
	return (
		<>
			<Wrapper>
				<Button title="UploadUploadUploadUpload" linkTo="#" color="var(--main-btn-color)" />
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
