import express from "express";
import multer from "multer";
import {uploadGCSFile} from "../middleware/uploadGCSFile";
import {uploadArtPoemController} from "../controllers/uploadArtPoemController";
import {getAllArtPoemController} from "../controllers/getAllArtPoemController";
import {getArtPoemController} from "../controllers/getArtPoemController";
import {editArtPoemController} from "../controllers/editArtPoemController";

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // no larger than 5mb, change as needed.
	},
});

const artPoemRouter = express.Router();

artPoemRouter.get("/get-all", getAllArtPoemController);

artPoemRouter.get("/get-artpoem", getArtPoemController);

artPoemRouter.post("/upload", upload.single("imageFile"), uploadGCSFile, uploadArtPoemController);

artPoemRouter.put("/edit", upload.single("editImageFile"), uploadGCSFile, editArtPoemController);

export default artPoemRouter;
