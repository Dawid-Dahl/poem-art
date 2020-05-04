import express from "express";
import createUserRouter from "./create-user";
import {jsonResponse} from "../utils/utils";

const apiRouter = express.Router();

apiRouter.get("/ping", (req, res, next) => {
	res.json(jsonResponse(true, "Pong!"));
	next();
});

apiRouter.use("/create-user", createUserRouter);

export default apiRouter;
