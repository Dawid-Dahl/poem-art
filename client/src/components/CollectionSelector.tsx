import React from "react";
import styled from "styled-components";
import Button from "./Button";

export const CollectionSelector = () => {
	return (
		<>
			<Wrapper>
				<Button title="Collections" linkTo="#" kind="primary" />
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	width: 100%;
	height: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
