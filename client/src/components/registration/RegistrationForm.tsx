import React, {useState} from "react";
import Input from "../Input";
import {FormState, AuthJsonResponse} from "../../types/types";
import {RouteComponentProps, withRouter} from "react-router-dom";
import styled from "styled-components";
import {flashMessage} from "../../utils/utils";
import Button from "../Button";

interface Props extends RouteComponentProps {
	postUrl: string;
	redirectUrl: string;
}

const RegistrationForm: React.FC<Props> = ({postUrl, redirectUrl, history}) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");

	const turnFormStateIntoObj = (): FormState => ({
		username,
		email,
		password,
		confirmPassword,
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
								flashMessage(data.payload?.message ?? "");
								history.push(redirectUrl);
							} else {
								flashMessage(data.payload?.message ?? "");
							}
						})
						.catch(err => {
							console.error(err);
						});
					e.currentTarget.reset();
				}}
			>
				<h2>REGISTRATION</h2>
				<Input
					name="username"
					type="text"
					onChangleHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
						setUsername(e.target.value)
					}
					required
					minLength={4}
				/>
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
					minLength={4}
				/>
				<Input
					name="confirm-password"
					type="password"
					onChangleHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
						setconfirmPassword(e.target.value)
					}
					required
				/>
				<Button title="Register" kind="white" />
			</StyledForm>
		</>
	);
};

export default withRouter(RegistrationForm);

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
