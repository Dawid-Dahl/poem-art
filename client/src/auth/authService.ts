import store from "../store";
import {setUser, removeUser} from "../actions/actions";
import {xTokenPayload, User, ServerXTokenResponse} from "../types/types";
import {getPayloadFromJwt, flashMessage} from "../utils/utils";

export const authService = {
	setTokensInLocalStorage(data: any) {
		localStorage.setItem("x-token", `Bearer ${data.xToken}`);
		localStorage.setItem("x-refresh-token", `Bearer ${data.xRefreshToken}`);
	},

	setXToken(xToken: any) {
		localStorage.setItem("x-token", `Bearer ${xToken}`);
	},

	removeTokensFromLocalStorage() {
		localStorage.removeItem("x-token");
		localStorage.removeItem("x-refresh-token");
	},

	logout(customFlashMessage: string = "You're now logged out!") {
		if (!store.getState().userReducer.user) {
			if (location.pathname === "/register" || location.pathname === "/login") {
				return;
			} else {
				flashMessage(customFlashMessage);
			}
		}
		this.removeUserFromState();
		this.removeTokensFromLocalStorage();
		flashMessage(customFlashMessage);
	},

	isAdmin(user: User | undefined) {
		if (user) {
			return user.admin ? true : false;
		} else {
			return false;
		}
	},

	storeUserInState(user?: User) {
		if (!store.getState().userReducer.user) {
			if (user) store.dispatch(setUser(user));
			flashMessage("You're now logged in!");
		}
	},

	removeUserFromState() {
		store.dispatch(removeUser());
	},

	isXTokenExpired(payload: xTokenPayload | undefined) {
		if (payload) {
			const {exp} = payload;
			return Date.now() >= exp * 1000 ? true : false;
		}
		return;
	},

	isClientSideXTokenValid(xToken: string | null): boolean {
		if (!xToken) return false;

		const payload = getPayloadFromJwt(xToken);

		if (!payload) return false;

		const {exp} = payload;

		return Date.now() >= exp * 1000 ? false : true;
	},

	async verifyXRefreshTokenServerSide(
		xRefreshToken: string | null
	): Promise<ServerXTokenResponse> {
		try {
			const res = await fetch(`${process.env.AUTH_FETCH_URL}/api/verify-jwt`, {
				method: "POST",
				headers: {
					"x-refresh-token": xRefreshToken ?? "null",
					"Content-Type": "application/json",
				},
			});

			const xToken = res.headers.get("x-token");

			return xToken
				? {isVerified: true, refreshedXToken: xToken}
				: {isVerified: false, refreshedXToken: null};
		} catch (e) {
			console.log(e);
			flashMessage("Could not connect to the server, please try again soon!");
			return {isVerified: false, refreshedXToken: null};
		}
	},
};
