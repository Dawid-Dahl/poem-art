import express from "express";
import {getConnection} from "typeorm";
import {jsonResponse} from "../utils/utils";
import {User} from "../../db/entities/User";

const userRouter = express.Router();

userRouter.get("/get/:id", async (req, res, next) => {
	const userRepo = getConnection(process.env.NODE_ENV).getRepository(User);

	const id = req.params.id;

	try {
		const user = await userRepo.findOne(id);

		res.json(jsonResponse(true, JSON.stringify({user})));
	} catch (e) {
		console.log(e);

		res.status(401).json(jsonResponse(false));
	}
});

userRouter.post("/create", async (req, res, next) => {
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
			console.error(e);
			res.status(401).json(jsonResponse(false));
		}
	} else {
		res.status(401).json(jsonResponse(false));
	}
});

export default userRouter;
