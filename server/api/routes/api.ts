import express from "express";
import userRouter from "./userRouter";
import artPoemRouter from "./artPoemRouter";
import {jsonResponse} from "../utils/utils";

const apiRouter = express.Router();

apiRouter.get("/ping", (req, res, next) => {
	res.json(jsonResponse(true, "Pong!"));
	next();
});

apiRouter.use("/users", userRouter);
apiRouter.use("/artpoem", artPoemRouter);

export default apiRouter;
