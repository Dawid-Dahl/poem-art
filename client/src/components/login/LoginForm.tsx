import React, {useState} from "react";
import {withRouter, RouteComponentProps} from "react-router-dom";
import Input from "../inputs/TextInput";
import {LoginInformation} from "../../types/types";
import {authService} from "../../auth/authService";
import Button from "../Button";
import {flashMessage, constructUserFromId} from "../../utils/utils";
import styled from "styled-components";
import TextInput from "../inputs/TextInput";

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			const res = await fetch(postUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(turnFormStateIntoObj()),
			});

			const data = await res.json();

			if (data.success) {
				const user = await constructUserFromId(data.payload.user.id);

				if (data.success) {
					authService.setTokensInLocalStorage(data);
					authService.storeUserInState(user);
					history.push(redirectUrl);
				} else {
					flashMessage(data.payload?.message ?? "");
				}
			} else {
				flashMessage(data.payload?.message ?? "");
			}
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
				<h2>LOGIN</h2>
				<TextInput
					name="email"
					value={email}
					type="email"
					onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEmail(e.target.value)
					}
					required
				/>
				<TextInput
					name="password"
					value={password}
					type="password"
					onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
						setPassword(e.target.value)
					}
					required
				/>
				<Button title="Login" kind="white" type="submit" />
			</StyledForm>
		</>
	);
};

export default withRouter(LoginForm);

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
