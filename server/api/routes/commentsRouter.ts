import express from "express";
import {postCommentController} from "../controllers/comment/postCommentController";

const commentsRouter = express.Router();

commentsRouter.post("/post", postCommentController);

export default commentsRouter;
