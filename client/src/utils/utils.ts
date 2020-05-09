import {xTokenPayload, User, Artpoem, Comment} from "../types/types";
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

//FIND OUT WHY THIS IS NOT WORKING

export const removeBearerFromTokenHeader = (tokenHeader: string | undefined | null) => {
	if (!tokenHeader) return;

	return tokenHeader.match(/^Bearer /) ? tokenHeader.split(" ")[1] : tokenHeader;
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
