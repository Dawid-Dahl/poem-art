import express from "express";
import multer from "multer";
import {uploadToGCS} from "../middleware/uploadToGCS";
import {uploadController} from "../controllers/uploadController";

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // no larger than 5mb, change as needed.
	},
});

const poemArtRouter = express.Router();

poemArtRouter.post("/upload", upload.single("imageFile"), uploadToGCS, uploadController);

export default poemArtRouter;
