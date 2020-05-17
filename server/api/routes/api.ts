import express from "express";
import userRouter from "./userRouter";
import artPoemRouter from "./artPoemRouter";
import collectionsRouter from "./collectionsRouter";
import {jsonResponse} from "../utils/utils";
import verifyXToken from "../middleware/verifyXToken";

const apiRouter = express.Router();

apiRouter.get("/ping", (req, res, next) => {
	res.json(jsonResponse(true, "Pong!"));
	next();
});

apiRouter.use("/users", userRouter);
apiRouter.use("/artPoem", verifyXToken, artPoemRouter);
apiRouter.use("/collections", verifyXToken, collectionsRouter);

export default apiRouter;
