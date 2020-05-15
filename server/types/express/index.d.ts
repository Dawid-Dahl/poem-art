declare namespace Express {
	interface Request {
		gcsPublicUrl?: string;
		user?: import("../types").UserId;
	}
}
