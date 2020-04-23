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
	name: string;
	collection: string;
};

export type Poem = {
	id: number;
	title: string;
	content: string;
	imageUrl: string;
	createdAt: number;
	likes?: number;
	comments?: Comment[];
};

export type Collection = {
	id: number;
	poems: Poem[];
	createdAt: number;
};

export type Comment = {
	content: string;
	createdAt: number;
	username: string;
};

export type xTokenPayload = {
	sub: number;
	username?: string;
	email?: string;
	admin?: 0 | 1;
	iat: number;
	exp: number;
};

export type User = {
	id: number;
	username: string;
	email?: string;
	date_added?: string;
	admin: number;
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
