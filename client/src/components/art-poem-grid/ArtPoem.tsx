import React from "react";
import styled from "styled-components";
import {Poem} from "../../types/types";

const ArtPoem: React.FC<Poem> = ({title, likes, imageUrl}) => {
	return (
		<>
			<Wrapper>
				<StyledDiv imageUrl={imageUrl}>
					<h1>{title}</h1>
					<p>{`👍🏻 ${likes}`}</p>
				</StyledDiv>
			</Wrapper>
		</>
	);
};

export default ArtPoem;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

type Props = {
	imageUrl: string;
};

const StyledDiv = styled.div<Props>`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-image: ${props => `url(${props.imageUrl})`};
	background-size: cover;
	border-radius: 20px;
	height: 300px;
	width: 300px;
	background-color: lightgray;
	overflow: hidden;

	@media only screen and (max-width: 805px) {
		width: 90%;
	}

	h1 {
		color: white;
		max-width: 200px;
		padding: 5px;
		border-radius: 5px;
		background-color: #0000005c;
		text-align: center;
	}

	p {
		color: white;
		padding: 5px;
		border-radius: 5px;
		background-color: #0000005c;
	}
`;
