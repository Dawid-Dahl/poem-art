import {jsonResponse} from "../../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {Comment} from "../../../db/entities/Comment";

export const editCommentController = async (req: Request, res: Response) => {
	const commentsRepo = getConnection(process.env.NODE_ENV).getRepository(Comment);

	try {
		const artPoemId = req.query.commentId;
		const {commentContent} = req.body;

		console.log(artPoemId, commentContent);

		/* const commentsByArtPoemId = await commentsRepo.find({
			where: {artpoem: {id: artPoemId}},
			relations: ["user"],
			take: parseFloat(commentCount as string),
		});

        res.status(200).json(jsonResponse(true, JSON.stringify(commentsByArtPoemId))); */
		res.end();
	} catch (e) {
		console.log(e);

		res.status(500).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to get the comments!",
				})
			)
		);
	}
};
