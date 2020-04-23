import store from "../store";
import {setUser, removeUser} from "../actions/actions";
import {xTokenPayload, User} from "../types/types";
import {getPayloadFromJwt, flashMessage, constructUserFromTokenPayload} from "../utils/utils";

export const authService = {
	setTokensInLocalStorage(data: any) {
		localStorage.setItem("x-token", `Bearer ${data.xToken}`);
		localStorage.setItem("x-refresh-token", `Bearer ${data.xRefreshToken}`);
	},

	refreshXToken(xToken: any) {
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

	verifyXTokenClientSide(xToken: string | null) {
		if (xToken) {
			if (!this.isXTokenExpired(getPayloadFromJwt(xToken))) {
				const user = constructUserFromTokenPayload(getPayloadFromJwt(xToken));
				this.storeUserInState(user);
			} else {
				if (localStorage.getItem("x-refresh-token")) {
					console.log("Verifying server side!");
					this.verifyXRefreshTokenServerSide(localStorage.getItem("x-refresh-token"));
				} else {
					this.logout("You're not allowed to access that page. Please log in!");
				}
			}
		} else {
			if (localStorage.getItem("x-refresh-token")) {
				this.verifyXRefreshTokenServerSide(localStorage.getItem("x-refresh-token"));
			} else {
				this.logout("You're not allowed to access that page. Please log in!");
				this.removeTokensFromLocalStorage();
			}
		}
	},

	verifyXRefreshTokenServerSide(xRefreshToken: string | null) {
		fetch(`${process.env.FETCH_URL}/api/verify-jwt`, {
			method: "POST",
			headers: {
				"x-refresh-token": xRefreshToken ?? "null",
				"Content-Type": "application/json",
			},
		})
			.then(res => {
				const xToken = res.headers.get("x-token");
				if (xToken) {
					this.refreshXToken(xToken);
					const user = constructUserFromTokenPayload(getPayloadFromJwt(xToken));
					this.storeUserInState(user);
				} else {
					this.logout("You're not allowed to access that page. Please log in!");
					this.removeTokensFromLocalStorage();
				}
			})
			.catch(err => console.error(err));
	},
};