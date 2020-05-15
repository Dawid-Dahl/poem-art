import {jsonResponse} from "../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {PoemArt} from "../../db/entities/PoemArt";
import {Collection} from "../../db/entities/Collection";

export const uploadController = async (req: Request, res: Response) => {
	const poemArtRepo = getConnection(process.env.NODE_ENV).getRepository(PoemArt);
	const collectionRepo = getConnection(process.env.NODE_ENV).getRepository(Collection);

	//TODO: Here you should add the poemArt to the DB.

	const {title, collection, poem} = JSON.parse(req.body.poemFields);

	try {
		const poemArt = new PoemArt();

		const query = await collectionRepo.find({where: {userId: req.user}});

		//TODO Finish the collection functionality. Now defaults to "My Collection" collection.

		const myCollection = query.filter(x => x.name === "My Collection")[0];

		poemArt.title = title;
		poemArt.content = poem;
		poemArt.imageUrl = req.gcsPublicUrl ?? "";
		poemArt.collections = myCollection;

		await poemArtRepo.save(poemArt);

		console.log("PoemArt was uploaded!");

		res.status(201).json(
			jsonResponse(
				true,
				JSON.stringify({
					message: "PoemArt uploaded successfully!",
					publicUrl: req.gcsPublicUrl,
				})
			)
		);
	} catch (e) {
		console.log(e);
		res.status(409).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to upload the PoemArt!",
				})
			)
		);
	}
};
