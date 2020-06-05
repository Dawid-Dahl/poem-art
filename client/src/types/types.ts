import {ReduxCollectionState} from "../actions/collectionActions";
import {ReduxPoemState} from "../actions/poemActions";
import {ReduxUserState} from "../actions/userActions";

export type FormState = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type LoginCredentials = {
	email: string;
	password: string;
};

export type UploadInformation = {
	formData: FormData;
	json: string;
};

export type ImageFile = string | Blob | null | undefined;

export type ReduxArtPoem = {
	id: number;
	title: string;
	content: string;
	imageUrl: string;
	likes?: number;
	comments?: Comment[];
	userId?: string;
	createdAt?: number;
	updatedAt?: number;
};

export type ReduxCollection = {
	id: string;
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

export type MainApiJsonResponse = {
	success: boolean;
	payload?: any;
};

export type ServerXTokenResponse = {
	isVerified: boolean;
	refreshedXToken: string | null;
};

export type xToken = string | null;
export type xRefreshToken = string | null;

export type Tokens = {
	xToken: xToken;
	xRefreshToken: xRefreshToken;
};

export type ValidOrRefreshedXToken = string | null;

export type RefreshedXToken = string | null;

export type ReduxStates = ReduxCollectionState | ReduxPoemState | ReduxUserState;

//FORM OBJECT TYPES:

export type AddCollectionFormObject = {
	collectionName: string;
	isPublic: boolean;
};

export type EditPoemFields = {
	poemId: number;
	poemTitle: string;
	poemContent: string;
};
