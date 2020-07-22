import React from "react";
import styled from "styled-components";
import Button from "../Button";
import {useDispatch} from "react-redux";

type Props = {
	comment: string;
};

const CommentSubmitSection: React.FC<Props> = ({comment}) => {
	const dispatch = useDispatch();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<StyledForm
				action="POST"
				className="form"
				onSubmit={e => {
					e.persist();
					handleSubmit(e);
					e.currentTarget.reset();
				}}
			>
				<ButtonWrapper>
					<Button title="Cancel" kind="grey" type="button" minimalMinWidth noMargin />
				</ButtonWrapper>
				<ButtonWrapper>
					<Button title="Post" kind="primary" type="submit" minimalMinWidth noMargin />
				</ButtonWrapper>
			</StyledForm>
		</>
	);
};

export default CommentSubmitSection;

const StyledForm = styled.form`
	display: flex;
	justify-content: flex-end;
	margin: 0 1.5em 0.5em 0;
`;

const ButtonWrapper = styled.div`
	margin: 0 0.3em;
`;
