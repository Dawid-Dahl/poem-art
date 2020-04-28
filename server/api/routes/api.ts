import express from "express";
import artPoemsRouter from "./artPoems";
const db = require("../db/models");

const apiRouter = express.Router();

apiRouter.get("/test", (req, res) => {
	res.send("YOOOO");
});

apiRouter.get("/add-user", async (req, res) => {
	const response = await db.User.create({
		username: "Wobbly",
	});
	res.send(response);
});

apiRouter.use("/books", artPoemsRouter);

export default apiRouter;
