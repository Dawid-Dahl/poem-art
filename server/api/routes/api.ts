import express from "express";
import artPoemsRouter from "./artPoems";

const apiRouter = express.Router();

apiRouter.use("/books", artPoemsRouter);

export default apiRouter;
