import {jsonResponse} from "../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {ArtPoem} from "../../db/entities/ArtPoem";

export const getAllArtPoemController = async (req: Request, res: Response) => {
	const artPoemRepo = getConnection(process.env.NODE_ENV).getRepository(ArtPoem);

	try {
		const allArtPoems = await artPoemRepo.find({where: {user: req.user}});

		console.log("ALL ", allArtPoems);

		res.status(200).json(
			jsonResponse(
				true,
				JSON.stringify({
					poems: JSON.stringify(allArtPoems),
				})
			)
		);
	} catch (e) {
		console.log(e);

		res.status(404).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to get the artPoems!",
				})
			)
		);
	}
};
