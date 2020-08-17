import express from "express";
import userRouter from "./userRouter";
import artPoemRouter from "./artPoemRouter";
import collectionsRouter from "./collectionsRouter";
import {jsonResponse} from "../utils/utils";
import verifyXToken from "../middleware/verifyXToken";
import commentsRouter from "./commentsRouter";
import likesRouter from "./likeRouter";
import profileRouter from "./profileRouter";

const apiRouter = express.Router();

apiRouter.get("/ping", (req, res, next) => {
	res.json(jsonResponse(true, "Pong!"));
	next();
});

apiRouter.use("/users", userRouter);
apiRouter.use("/artpoem", verifyXToken, artPoemRouter);
apiRouter.use("/collections", verifyXToken, collectionsRouter);
apiRouter.use("/comments", verifyXToken, commentsRouter);
apiRouter.use("/likes", verifyXToken, likesRouter);
apiRouter.use("/profile", verifyXToken, profileRouter);

export default apiRouter;
