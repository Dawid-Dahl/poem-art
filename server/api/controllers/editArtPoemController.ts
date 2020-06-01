import {jsonResponse} from "../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {ArtPoem} from "../../db/entities/ArtPoem";
import {Storage} from "@google-cloud/storage";

export const editArtPoemController = async (req: Request, res: Response) => {
	const {poemId, poemTitle, poemContent} = req.body;

	try {
		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.update(ArtPoem)
			.set({title: poemTitle, content: poemContent})
			.where("id = :id", {id: poemId})
			.execute();

		res.status(201).json(
			jsonResponse(
				true,
				JSON.stringify({
					message: "ArtPoem was edited successfully!",
				})
			)
		);
	} catch (e) {
		console.log(e);

		res.status(409).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to edit the ArtPoem!",
				})
			)
		);
	}
};
