import express from "express";
import {jsonResponse} from "../utils/utils";

const artPoemRouter = express.Router();

artPoemRouter.post("/upload", (req, res) => {
	console.log(req.body);
	console.log(req.body.imageFile);
	res.send(jsonResponse(true, "UPLOADED!"));
});

export default artPoemRouter;
