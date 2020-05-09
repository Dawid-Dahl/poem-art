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
	title: string;
	collection: string;
	imageFile: {imageFile: FileList | File | null | undefined};
	poem: string;
};

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
	collection_id: number;
	poems: Artpoem[];
	createdAt: number;
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
