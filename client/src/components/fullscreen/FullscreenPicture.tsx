import React from "react";
import styled from "styled-components";
import PoemSection from "./PoemSection";
import CommentSection from "./CommentSection";
import LikesSection from "./LikesSection";

const FullscreenPicture: React.FC = () => {
	return (
		<>
			<Wrapper>
				<StyledDiv imageUrl="https://picsum.photos/id/1/1200/600">
					<Grid>
						<PoemSection />
						<CommentSection />
						<LikesSection />
					</Grid>
				</StyledDiv>
			</Wrapper>
		</>
	);
};

export default FullscreenPicture;

const Wrapper = styled.div``;

type StyledDivProps = {
	imageUrl: string;
};

const StyledDiv = styled.div<StyledDivProps>`
	position: absolute;
	height: 100vh;
	width: 100%;
	background-image: ${props => `url(${props.imageUrl})`};
	background-repeat: no-repeat;
	background-size: contain;
	z-index: -1;

	@media only screen and (max-width: 800px) {
		background-size: cover;
		background-position: center;
		height: 50vh;
	}
`;

const Grid = styled.div`
	width: 60%;
	margin: 7em auto;
	justify-content: center;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1em 1em;
	grid-template-areas: "PoemSection LikesSection" "PoemSection CommentSection";

	@media only screen and (max-width: 1280px) {
		width: 70%;

		p {
			padding: 10px;
		}
	}

	@media only screen and (max-width: 800px) {
		width: 80%;

		p {
			padding: 10px;
		}
	}
`;
