import {jsonResponse} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {Comment} from "../../../db/entities/Comment";
import {User} from "../../../db/entities/User";
import {ArtPoem} from "../../../db/entities/ArtPoem";

export const postCommentController = async (req: Request, res: Response) => {
	const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);
	const artPoemRepo = getConnection(process.env.NODE_ENV).getRepository(ArtPoem);
	const commentsRepo = getConnection(process.env.NODE_ENV).getRepository(Comment);

	try {
		const {commentContent, artPoemId} = req.body;

		const user = await userRepo.findOne(req.user);
		const artPoem = await artPoemRepo.findOne(artPoemId);

		if (!user) throw new Error("No user could be fetched from the DB");
		if (!artPoem) throw new Error("No artPoem could be fetched from the DB");

		const comment = new Comment();

		comment.comment = commentContent;
		comment.user = user;
		comment.artpoem = artPoem;

		const insertResult = await commentsRepo.save(comment);

		res.status(201).json(
			jsonResponse(
				true,
				JSON.stringify({
					message: `Your comment was posted successfully!`,
					insertResult: JSON.stringify(insertResult),
				})
			)
		);
	} catch (e) {
		console.log(e);

		res.status(500).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to post the comment!",
				})
			)
		);
	}
};
