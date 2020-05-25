import crypto from "crypto";
import {Storage} from "@google-cloud/storage";
import {Request, Response, NextFunction} from "express-serve-static-core";
import {replaceSpacesInString} from "../utils/utils";

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

	const sanitizedFileName = req.file.originalname.includes(" ")
		? replaceSpacesInString(req.file.originalname, "_")
		: req.file.originalname;

	const fileName = `${Date.now()}-${crypto.randomBytes(3).toString("hex")}-${sanitizedFileName}`;

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
			const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

			req.gcsPublicUrl = publicUrl;
			req.gcsFileName = fileName;

			next();
		})
		.end(req.file.buffer);
};
