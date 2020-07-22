import React from "react";
import styled from "styled-components";
import Button from "../Button";

type Props = {};

const CommentSubmitSection: React.FC<Props> = () => {
	return (
		<>
			<Wrapper>
				<ButtonWrapper>
					<Button title="Cancel" kind="grey" type="button" minimalMinWidth noMargin />
				</ButtonWrapper>
				<ButtonWrapper>
					<Button title="Post" kind="primary" type="submit" minimalMinWidth noMargin />
				</ButtonWrapper>
			</Wrapper>
		</>
	);
};

export default CommentSubmitSection;

const Wrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 0 1.5em 0.5em 0;
`;

const ButtonWrapper = styled.div`
	margin: 0 0.3em;
`;
