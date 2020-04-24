import express from "express";

const artPoemsRouter = express.Router();

artPoemsRouter.use("/artpoems", artPoemsRouter);

export default artPoemsRouter;
