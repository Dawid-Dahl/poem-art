import express from "express";
import {jsonResponse} from "../utils/utils";
import multer from "multer";
import {uploadToGCS} from "../middleware/uploadToGCS";

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // no larger than 5mb, change as needed.
	},
});

const poemArtRouter = express.Router();

poemArtRouter.post("/upload", upload.single("imageFile"), uploadToGCS, (req, res) => {
	//TODO: Here you should add the poemArt to the DB.
	/* res.status(201).json(
		jsonResponse(
			true,
			JSON.stringify({
				message: "Image uploaded to Google Cloud Storage!",
				publicUrl: req.gcsPublicUrl,
			})
		)
	); */
});

export default poemArtRouter;
