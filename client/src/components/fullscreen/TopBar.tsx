import React from "react";
import Button from "../Button";
import styled from "styled-components";

const TopBar = () => {
	return (
		<>
			<Wrapper>
				<Button title="Back" linkTo="/main" kind="white" />
				<TitleWrapper>
					<h1>NAME OF PICTURE</h1>
				</TitleWrapper>
			</Wrapper>
		</>
	);
};

export default TopBar;

const Wrapper = styled.div`
	position: absolute;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 2em 0;

	@media only screen and (max-width: 500px) {
		padding: 0;

		div {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
	}
`;

const TitleWrapper = styled.div`
	position: absolute;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2em 0;

	h1 {
		margin: 0px 10px;
		color: white;
	}

	@media only screen and (max-width: 800px) {
		justify-content: flex-end;
	}
`;
