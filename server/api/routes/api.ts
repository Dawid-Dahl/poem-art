import express from "express";
import artPoemsRouter from "./artPoems";

const apiRouter = express.Router();

apiRouter.get("/test", (req, res) => {
	res.send("YOOOO");
});

apiRouter.get("/add-user", async (req, res) => {});

apiRouter.use("/books", artPoemsRouter);

export default apiRouter;
