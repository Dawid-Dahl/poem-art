import express from "express";
import userRouter from "./userRouter";
import poemArtRouter from "./poemArtRouter";
import {jsonResponse} from "../utils/utils";
import verifyXToken from "../middleware/verifyXToken";

const apiRouter = express.Router();

apiRouter.get("/ping", (req, res, next) => {
	res.json(jsonResponse(true, "Pong!"));
	next();
});

apiRouter.use("/users", userRouter);
apiRouter.use("/poemArt", verifyXToken, poemArtRouter);

export default apiRouter;
