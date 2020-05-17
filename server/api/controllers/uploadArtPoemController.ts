import {jsonResponse} from "../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {ArtPoem} from "../../db/entities/ArtPoem";
import {Collection} from "../../db/entities/Collection";
import {Storage} from "@google-cloud/storage";

export const uploadArtPoemController = async (req: Request, res: Response) => {
	const artPoemRepo = getConnection(process.env.NODE_ENV).getRepository(ArtPoem);
	const collectionRepo = getConnection(process.env.NODE_ENV).getRepository(Collection);

	const {title, collection, poem} = JSON.parse(req.body.poemFields);

	console.log(collection);

	try {
		const artPoem = new ArtPoem();

		const query = await collectionRepo.find({where: {userId: req.user}});

		//TODO Finish the collection functionality. Now defaults to "My Collection" collection.

		const myCollection = query.filter(x => x.name === "My Collection")[0];

		artPoem.title = title;
		artPoem.content = poem;
		artPoem.imageUrl = req.gcsPublicUrl ?? "";
		artPoem.collections = [myCollection];

		await artPoemRepo.save(artPoem);

		console.log("ArtPoem was uploaded!");

		res.status(201).json(
			jsonResponse(
				true,
				JSON.stringify({
					message: "ArtPoem uploaded successfully!",
					publicUrl: req.gcsPublicUrl,
				})
			)
		);
	} catch (e) {
		console.log(e);

		const keyFile =
			"/Volumes/Seagate Backup Plus Drive/Dawid Programming Files/Projects/PoemArt/server/poem-art-40049b821725.json";

		const gcs = new Storage({
			keyFilename: keyFile,
			projectId: "poem-art",
		});

		const bucket = gcs.bucket(process.env.GCLOUD_STORAGE_BUCKET || "");

		const file = req.gcsFileName ? bucket.file(req.gcsFileName) : undefined;

		file?.delete()
			.then(_res => console.log("File was deleted from Google Cloud Storage!"))
			.catch(e => console.log(e));

		res.status(409).json(
			jsonResponse(
				false,
				JSON.stringify({
					message: "Something went wrong while trying to upload the ArtPoem!",
				})
			)
		);
	}
};
