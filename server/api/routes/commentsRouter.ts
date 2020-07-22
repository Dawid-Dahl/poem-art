import express from "express";
import {postCommentController} from "../controllers/comment/postCommentController";
import {getCommentsController} from "../controllers/comment/getCommentsController";

const commentsRouter = express.Router();

commentsRouter.get("/get", getCommentsController);
commentsRouter.post("/post", postCommentController);

export default commentsRouter;
