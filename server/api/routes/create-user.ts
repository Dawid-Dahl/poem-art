import express from "express";
import {getConnection} from "typeorm";
import {jsonResponse} from "../utils/utils";
import {User} from "../../db/entities/User";

const createUserRouter = express.Router();

createUserRouter.post("/", async (req, res, next) => {
	const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);

	const {id, username} = req.body;

	if (username && id) {
		try {
			const user = new User();
			user.id = id;
			user.username = username;

			await userRepo.save(user);

			console.log("User was saved!");

			res.json(jsonResponse(true));
			next();
		} catch (e) {
			res.json(jsonResponse(false));
			next(e);
		}
	} else {
		res.json(jsonResponse(false));
		next();
	}
});

export default createUserRouter;
