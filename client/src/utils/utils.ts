import {
	xTokenPayload,
	User,
	RefreshedXToken,
	MainApiJsonResponse,
	Tokens,
	ValidOrRefreshedXToken,
} from "../types/types";
import store from "../store";
import {authService} from "../auth/authService";
import {removeAllCollections} from "../actions/collectionActions";
import {hidePopup} from "../actions/popupActions";
import {showFlash, hideFlash} from "../actions/flashActions";
import {removeUser} from "../actions/userActions";
import {removeAllPoems} from "../actions/poemActions";

export const localStorageService = {
	setTokensInLocalStorage(tokens: Tokens) {
		localStorage.setItem("x-token", `Bearer ${tokens.xToken}`);
		localStorage.setItem("x-refresh-token", `Bearer ${tokens.xRefreshToken}`);
	},

	removeTokensFromLocalStorage() {
		localStorage.removeItem("x-token");
		localStorage.removeItem("x-refresh-token");
	},

	setXToken(xToken: string | undefined) {
		xToken && localStorage.setItem("x-token", `Bearer ${xToken}`);
	},
};

export const range = (start: number, end: number): number[] =>
	end <= start ? [end] : [...range(start, end - 1), end];

export const getPayloadFromJwt = (jwt: string) =>
	jwt
		.split(/\s|\./g)
		.filter(x => x !== "Bearer" && x !== "bearer")
		.reduce(
			(acc, cur, i) => (i === 1 ? [...acc, JSON.parse(atob(cur))] : [...acc]),
			[] as Array<xTokenPayload>
		)[0];

export const constructUserFromId = (
	identification: string | undefined
): Promise<User> | undefined => {
	if (identification) {
		return new Promise(async (res, rej) => {
			try {
				const response = await fetch(
					`${process.env.MAIN_FETCH_URL}/api/users/get/${identification}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const data = await response.json();

				const {id, username, admin} = JSON.parse(data.payload).user;

				res({
					id,
					username,
					admin,
				});
			} catch (e) {
				rej(e);
			}
		});
	}
	return;
};

export const flashMessage = (message: string) => {
	store.dispatch(showFlash(message));
};

export const areStringsIdentical = (str1: string, str2: string) => {
	str1.match(RegExp(`^${str2}$`)) ? true : false;
};

export const removeBearerFromTokenHeader = (tokenHeader: string | undefined | null) => {
	if (!tokenHeader) return;

	return tokenHeader.match(/^Bearer /) ? tokenHeader.split(" ")[1] : tokenHeader;
};

/** This function takes an x-refresh-token and uses it to return a new and refreshed x-token.
 *
 * Returns null if something went wrong.
 */
export const refreshXToken = (xRefreshToken: string | null): Promise<RefreshedXToken> => {
	return new Promise((resolve, reject) => {
		if (!xRefreshToken) {
			reject(null);
		}

		console.log("Refreshing server side!");

		authService
			.verifyXRefreshTokenServerSide(xRefreshToken)
			.then(res => {
				if (res.isVerified) {
					resolve(res.refreshedXToken);
				} else {
					reject(null);
				}
			})
			.catch(e => (console.log(e), reject(null)));
	});
};

/** This function takes an x-refresh-token and uses it to return a new and refreshed x-token.
 *
 * Compared to "refreshXToken", this function also sets x-token in localStorage before returning it.
 *
 * Returns null if something went wrong.
 */
export const refreshAndSetXToken = (xRefreshToken: string | null): Promise<RefreshedXToken> => {
	return new Promise(async (resolve, reject) => {
		try {
			const refreshedXToken = await refreshXToken(xRefreshToken);

			if (!refreshedXToken) {
				throw new Error("Couldn't refresh x-token");
			} else {
				localStorageService.setXToken(refreshedXToken);

				resolve(refreshedXToken);
			}
		} catch (e) {
			console.log(e);
			reject(null);
		}
	});
};

/** This curried function takes an x-token and attaches it to the outgoing fetch request headers.
 *
 * Returns a fetch function with the x-token header added.
 *
 * Throws an error if something went wrong.
 */
export const addXTokenHeaderToFetch = (xToken: string | null) => async (
	url: string,
	{method, headers, body}: RequestInit
): Promise<Response> => {
	if (!xToken) {
		throw new Error("There is an issue with the supplied x-token.");
	}

	const headersWithTokenAdded = {...headers, "x-token": xToken};

	const response = await fetch(url, {
		method: method,
		headers: headersWithTokenAdded,
		body,
	});

	return response;
};

export const resetReduxState = () => {
	store.dispatch(removeUser());
	store.dispatch(removeAllCollections());
	store.dispatch(removeAllPoems());
	store.dispatch(hideFlash());
	store.dispatch(hidePopup());
};

export const parseMainApiResponse = (res: MainApiJsonResponse) => {
	if (res.success) {
		return JSON.parse(res.payload);
	} else {
		throw new Error("Something went wrong while calling the Api");
	}
};

/** This function takes a xToken/xRefreshToken-pair and uses them for verification.
 *
 * Returns the x-token if valid, or a refreshed x-token if not valid but x-refresh-token is valid.
 *
 * Otherwise returns null.
 */
export const refreshTokenIfNeeded = ({
	xToken,
	xRefreshToken,
}: Tokens): Promise<ValidOrRefreshedXToken> => {
	return new Promise((resolve, reject) => {
		if (!xToken) {
			console.log("Verifying server side!");

			authService
				.verifyXRefreshTokenServerSide(xRefreshToken)
				.then(res => {
					if (res.isVerified) {
						resolve(res.refreshedXToken);
					} else {
						reject(null);
					}
				})
				.catch(e => (console.log(e), reject(null)));
		}

		if (!xRefreshToken) {
			reject(null);
		}

		if (authService.isClientSideXTokenValid(xToken)) {
			resolve(removeBearerFromTokenHeader(xToken));
		} else {
			console.log("Verifying server side!");

			authService
				.verifyXRefreshTokenServerSide(xRefreshToken)
				.then(res => {
					if (res.isVerified) {
						resolve(res.refreshedXToken);
					} else {
						reject(null);
					}
				})
				.catch(e => (console.log(e), reject(null)));
		}
	});
};
