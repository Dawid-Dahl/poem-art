import {Storage} from "@google-cloud/storage";
import {Request, Response, NextFunction} from "express-serve-static-core";
import {jsonResponse} from "../utils/utils";

const keyFile =
	"/Volumes/Seagate Backup Plus Drive/Dawid Programming Files/Projects/PoemArt/server/poem-art-40049b821725.json";

const gcs = new Storage({
	keyFilename: keyFile,
	projectId: "poem-art",
});

const bucket = gcs.bucket(process.env.GCLOUD_STORAGE_BUCKET || "");

export const uploadToGCS = (req: Request, res: Response, next: NextFunction) => {
	if (!req.file) {
		res.status(404).send("No file uploaded.");
		return;
	}

	const fileName = req.file.originalname;

	const file = bucket.file(fileName);

	file.createWriteStream({
		resumable: false,
		metadata: {
			contentType: req.file.mimetype,
		},
		gzip: true,
	})
		.on("error", err => next(err))
		.on("finish", () => {
			const publicUrl = `https://storage.cloud.google.com/${bucket.name}/${file.name}`;

			//TODO: add relevant info to req object.

			req.gcsPublicUrl = publicUrl;
		})
		.end(req.file.buffer);

	next();
};
