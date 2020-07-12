import {jsonResponse} from "../utils/utils";
import {Request, Response} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {ArtPoem} from "../../db/entities/ArtPoem";
import {Storage, Bucket} from "@google-cloud/storage";

export const editArtPoemController = async (req: Request, res: Response) => {
	const {poemId, poemTitle, poemContent} = JSON.parse(req.body.editPoemFields);

	const keyFile =
		"/Volumes/Seagate Backup Plus Drive/Dawid Programming Files/Projects/PoemArt/server/poem-art-40049b821725.json";

	const gcs = new Storage({
		keyFilename: keyFile,
		projectId: "poem-art",
	});

	const bucket = gcs.bucket(process.env.GCLOUD_STORAGE_BUCKET || "");

	const deleteGCSFile = async (bucket: Bucket, name: string) => {
		await bucket.file(name).delete();

		console.log(`gs://${bucket.name}/${name} --- DELETED.`);
	};

	try {
		if (req.file) {
			const artPoemRepo = getConnection(process.env.NODE_ENV).getRepository(ArtPoem);

			const artPoem = await artPoemRepo.findOne(req.query.id as string);

			if (!artPoem) throw new Error("No Artpoem was found in the database!");

			await deleteGCSFile(bucket, artPoem.imageUrl.split("/").slice(-1)[0]).catch(
				console.error
			);

			await getConnection(process.env.NODE_ENV)
				.createQueryBuilder()
				.update(ArtPoem)
				.set({imageUrl: req.gcsPublicUrl})
				.where("id = :id", {id: poemId})
				.execute();
		}

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
