import {Storage} from "@google-cloud/storage";
import {Request, Response, NextFunction} from "express-serve-static-core";
import {getConnection} from "typeorm";
import {User} from "../../db/entities/User";
import {Collection} from "../../db/entities/Collection";
import {ArtPoem} from "../../db/entities/ArtPoem";
import {Comment} from "../../db/entities/Comment";
import {Like} from "../../db/entities/Like";

export const deleteAllMainServerUserData = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.delete()
			.from(Like)
			.where("userId = :userId", {userId: req.user})
			.execute();

		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.delete()
			.from(Comment)
			.where("userId = :userId", {userId: req.user})
			.execute();

		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.delete()
			.from(Collection)
			.where("userId = :userId", {userId: req.user})
			.execute();

		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.delete()
			.from(ArtPoem)
			.where("userId = :userId", {userId: req.user})
			.execute();

		await getConnection(process.env.NODE_ENV)
			.createQueryBuilder()
			.delete()
			.from(User)
			.where("id = :id", {id: req.user})
			.execute();

		console.log(`User ${req.user} was successfully deleted from the Auth Server`);

		next();
	} catch (e) {
		console.log(e);
		next(e);
	}
};
