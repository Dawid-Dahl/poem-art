import express from "express";
import createUserRouter from "./create-user";

const apiRouter = express.Router();

apiRouter.use("/create-user", createUserRouter);

export default apiRouter;
