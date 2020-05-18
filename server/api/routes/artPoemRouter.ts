import express from "express";
import multer from "multer";
import {uploadToGCS} from "../middleware/uploadToGCS";
import {uploadArtPoemController} from "../controllers/uploadArtPoemController";
import {getAllArtPoemController} from "../controllers/getAllArtPoemController";

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // no larger than 5mb, change as needed.
	},
});

const artPoemRouter = express.Router();

artPoemRouter.get("/get-all", getAllArtPoemController);

artPoemRouter.post("/upload", upload.single("imageFile"), uploadToGCS, uploadArtPoemController);

export default artPoemRouter;
