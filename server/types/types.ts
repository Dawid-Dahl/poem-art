export type ArtPoemId = Pick<ArtPoem, "id">;

export type ArtPoem = {
	id: number;
	title: string;
	content: string;
	likes: number;
	comments: CommentId[];
	imageUrl: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
	collections: Collection[];
};

export type CollectionId = Pick<Collection, "id">;

export type Collection = {
	id: number;
	name: string;
	public: boolean;
	createdAt: string;
	updatedAt: string;
};

export type CommentId = Pick<Comment, "id">;

export type Comment = {
	id: number;
	author: ArtPoemId;
	comment: string;
	likes: number;
	createdAt: string;
	updatedAt: string;
};

export type UserId = User["id"];

export type User = {
	id: string;
	username: string;
	email: string;
	password?: string;
	admin: number;
	profile_picture?: string;
	date_added?: string;
};

export type xTokenPayload = {
	sub: string;
	iat: string;
	exp: string;
};

export type SQLRefreshToken = {
	sub: number;
	iat: number;
	refreshToken: string | undefined;
};

export type AuthJsonResponse = {
	success: boolean;
	payload?: string | NodeJS.ReadableStream | undefined;
};
