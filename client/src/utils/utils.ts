import {xTokenPayload, User, Artpoem, Comment, RefreshedXToken} from "../types/types";
import store from "../store";
import {showFlash, hideFlash, setFlashMessage} from "../actions/actions";
import {authService} from "../auth/authService";

export const range = (start: number, end: number): number[] =>
	end <= start ? [end] : [...range(start, end - 1), end];

export const getPayloadFromJwt = (jwt: string | null) =>
	jwt
		?.split(/\s|\./g)
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
	store.dispatch(setFlashMessage(message));
	store.dispatch(showFlash());
	setTimeout(() => {
		store.dispatch(hideFlash());
	}, 3000);
};

export const areStringsIdentical = (str1: string, str2: string) =>
	str1.match(RegExp(`^${str2}$`)) ? true : false;

export const saveUserInStoreWithXToken = (xToken: string | null) => {
	constructUserFromId(getPayloadFromJwt(xToken)?.sub)
		?.then(user => {
			authService.storeUserInState(user);
		})
		.catch(e => console.log(e));
};

export const removeBearerFromTokenHeader = (tokenHeader: string | undefined | null) => {
	if (!tokenHeader) return;

	return tokenHeader.match(/^Bearer /) ? tokenHeader.split(" ")[1] : tokenHeader;
};

/** This function takes an xRefreshToken and uses it to return a new and refreshed x-token.
 *
 * Returns null if something went wrong.
 */
export const refreshXToken = (xRefreshToken: string | null): Promise<RefreshedXToken> => {
	return new Promise((resolve, reject) => {
		if (location.pathname === "/register" || location.pathname === "/login") {
			return;
		} else {
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

// temporary dummy function - remove later

export const createDummyPoem = (
	artpoem_id: number,
	title: string,
	content: string,
	imageUrl: string,
	createdAt: number,
	likes?: number,
	comments?: Comment[]
): Artpoem => ({
	artpoem_id,
	title,
	content,
	imageUrl,
	likes,
	comments,
	createdAt,
});
