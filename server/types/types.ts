export type ArtPoemId = Pick<ArtPoem, "artpoem_id">;

export type ArtPoem = {
	artpoem_id: number;
	title: string;
	content: string;
	likes: number;
	comments: CommentId[];
	image_url: string;
	userId: string;
	created_at: number;
	updated_at: number;
	collections: Collection[];
};

export type CollectionId = Pick<Collection, "collection_id">;

export type Collection = {
	collection_id: number;
	name: string;
	public: boolean;
	createdAt: string;
	updatedAt: string;
};

export type CommentId = Pick<Comment, "comment_id">;

export type Comment = {
	comment_id: number;
	author: ArtPoemId;
	comment: string;
	likes: number;
	created_at: number;
	updated_at: number;
};

export type UserId = User["user_id"];

export type User = {
	user_id: string;
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
