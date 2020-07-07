import express from "express";
import multer from "multer";
import {uploadGCSFile} from "../middleware/uploadGCSFile";
import {uploadArtPoemController} from "../controllers/uploadArtPoemController";
import {getAllArtPoemController} from "../controllers/getAllArtPoemController";
import {getArtPoemController} from "../controllers/getArtPoemController";
import {editArtPoemController} from "../controllers/editArtPoemController";
import {deleteArtPoemController} from "../controllers/deleteArtPoemController";
import {getArtPoemsByCollectionController} from "../controllers/getArtPoemsByCollectionController";
import {getArtPoemsByUserIdController} from "../controllers/getArtPoemsByIdController";

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // no larger than 5mb, change as needed.
	},
});

const artPoemRouter = express.Router();

artPoemRouter.get("/get-all", getAllArtPoemController);

artPoemRouter.get("/user-id", getArtPoemsByUserIdController);

artPoemRouter.get("/collection", getArtPoemsByCollectionController);

artPoemRouter.get("/get-artpoem", getArtPoemController);

artPoemRouter.post("/upload", upload.single("imageFile"), uploadGCSFile, uploadArtPoemController);

artPoemRouter.put(
	"/edit-artpoem",
	upload.single("editImageFile"),
	uploadGCSFile,
	editArtPoemController
);

artPoemRouter.delete("/delete-artpoem", deleteArtPoemController);

export default artPoemRouter;
