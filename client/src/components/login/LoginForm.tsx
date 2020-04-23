import React, {useState} from "react";
import {withRouter, RouteComponentProps} from "react-router-dom";
import Input from "../Input";
import {LoginInformation, AuthJsonResponse} from "../../types/types";
import {authService} from "../../auth/authService";
import Button from "../Button";
import {flashMessage} from "../../utils/utils";
import styled from "styled-components";

interface Props extends RouteComponentProps {
	postUrl: string;
	redirectUrl: string;
}

const LoginForm: React.FC<Props> = ({postUrl, redirectUrl, history}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const turnFormStateIntoObj = (): LoginInformation => ({
		email,
		password,
	});

	return (
		<>
			<StyledForm
				action="POST"
				className="form"
				onSubmit={e => {
					e.preventDefault();
					fetch(postUrl, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(turnFormStateIntoObj()),
					})
						.then(res => res.json())
						.then((data: AuthJsonResponse) => {
							if (data.success) {
								authService.setTokensInLocalStorage(data);
								authService.storeUserInState();
								history.push(redirectUrl);
							} else {
								flashMessage(data.payload?.message ?? "");
							}
						})
						.catch(err => console.error(err));
					e.currentTarget.reset();
				}}
			>
				<h2>LOGIN</h2>
				<Input
					name="email"
					type="email"
					onChangleHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEmail(e.target.value)
					}
					required
				/>
				<Input
					name="password"
					type="password"
					onChangleHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
						setPassword(e.target.value)
					}
					required
				/>
				<Button title="Login" kind="white" />
			</StyledForm>
		</>
	);
};

export default withRouter(LoginForm);

// -------------- CSS -------------- //

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
