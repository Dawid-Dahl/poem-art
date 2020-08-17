import {Storage} from "@google-cloud/storage";
import {Request, Response, NextFunction} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {User} from "../../db/entities/User";
import {deleteGCSFile} from "../utils/gcsUtils";

export const deleteProfileImageFromGCSIfExists = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//get the user from db to find out if there is a profile image

		const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);

		const user = await userRepo.findOne(req.user);

		if (!user) throw new Error("No user was found in the database!");

		if (user.profilePicture) {
			//if there is a profile image, delete it
			const keyFile =
				"/Volumes/Seagate Backup Plus Drive/Dawid Programming Files/Projects/PoemArt/server/poem-art-40049b821725.json";

			const gcs = new Storage({
				keyFilename: keyFile,
				projectId: "poem-art",
			});

			const bucket = gcs.bucket(process.env.GCLOUD_STORAGE_BUCKET || "");

			const profilePictureName = user.profilePicture.split("/").slice(-1)[0];

			await deleteGCSFile(bucket, profilePictureName);

			next();
		} else {
			//otherwise just proceed with upload
			next();
		}
	} catch (e) {
		console.log(e);
	}
};
