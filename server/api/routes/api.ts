import express from "express";
import userRouter from "./userRouter";
import {jsonResponse} from "../utils/utils";

const apiRouter = express.Router();

apiRouter.get("/ping", (req, res, next) => {
	res.json(jsonResponse(true, "Pong!"));
	next();
});

apiRouter.use("/users", userRouter);

export default apiRouter;
