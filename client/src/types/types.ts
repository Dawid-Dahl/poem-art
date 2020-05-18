import {ReduxCollectionState} from "../actions/collectionActions";
import {ReduxFlashState} from "../actions/flashActions";
import {ReduxPoemState} from "../actions/poemAction";
import {ReduxPopupState} from "../actions/popupActions";
import {ReduxUserState} from "../actions/userActions";

export type FormState = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type LoginInformation = {
	email: string;
	password: string;
};

export type UploadInformation = {
	formData: FormData;
	json: string;
};

export type ImageFile = string | Blob | null | undefined;

export type Artpoem = {
	artpoem_id: number;
	title: string;
	content: string;
	imageUrl: string;
	createdAt: number;
	likes?: number;
	comments?: Comment[];
};

export type Collection = {
	name: string;
	public: boolean;
};

export type Comment = {
	content: string;
	createdAt: number;
	username: string;
};

export type xTokenPayload = {
	sub: string;
	iat: number;
	exp: number;
};

export type User = {
	id: number;
	username: string;
	admin: number;
	profilePicture?: string;
};

export type AuthJsonResponsePayload = {
	message?: string;
	user?: User;
};

export type AuthJsonResponse = {
	success: boolean;
	payload?: AuthJsonResponsePayload;
	xToken?: string;
	xRefreshToken?: string;
};

export type ServerXTokenResponse = {
	isVerified: boolean;
	refreshedXToken: string | null;
};

export type ValidOrRefreshedXToken = string | null;

export type RefreshedXToken = string | null;

export type ReduxStates =
	| ReduxCollectionState
	| ReduxFlashState
	| ReduxPoemState
	| ReduxPopupState
	| ReduxUserState;
