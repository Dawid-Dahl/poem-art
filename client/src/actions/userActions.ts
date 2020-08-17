import {User} from "../types/types";

export const setUser = (user: User) =>
	({
		type: "SET_USER",
		user,
	} as const);

export const removeUser = () =>
	({
		type: "REMOVE_USER",
	} as const);

export const updateProfileImage = (imageFile: FormData) =>
	({
		type: "UPDATE_PROFILE_PICTURE",
		imageFile,
	} as const);

export const updateProfileImageFulfilled = (profileImageUrl: string | null) =>
	({
		type: "UPDATE_PROFILE_PICTURE_FULFILLED",
		profileImageUrl,
	} as const);

export const updateProfileImageFailed = () =>
	({
		type: "UPDATE_PROFILE_PICTURE_FAILED",
	} as const);

export type ReduxUserState = "user";

export type UserActionTypes =
	| ReturnType<typeof setUser>
	| ReturnType<typeof removeUser>
	| ReturnType<typeof updateProfileImage>
	| ReturnType<typeof updateProfileImageFulfilled>
	| ReturnType<typeof updateProfileImageFailed>;
