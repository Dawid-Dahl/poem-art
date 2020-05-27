import {LoginCredentials, Tokens} from "../types/types";

export const checkIfLoggedIn = (tokens: Tokens) =>
	({
		type: "CHECK_IF_LOGGED_IN",
		tokens,
	} as const);

export const login = (credentials: LoginCredentials) =>
	({
		type: "LOGIN",
		credentials,
	} as const);

export const loginFulfilled = () =>
	({
		type: "LOGIN_FULFILLED",
	} as const);

export const logout = () =>
	({
		type: "LOGOUT",
	} as const);

export const logoutFulFilled = () =>
	({
		type: "LOGOUT_FULFILLED",
	} as const);

export type LoginActionTypes =
	| ReturnType<typeof checkIfLoggedIn>
	| ReturnType<typeof login>
	| ReturnType<typeof loginFulfilled>
	| ReturnType<typeof logout>
	| ReturnType<typeof logoutFulFilled>;
