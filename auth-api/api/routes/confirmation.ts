import express from "express";
import {confirmationController} from "../controllers/confirmationController";

const confirmationRouter = express.Router();

confirmationRouter.get("/", (req, res) => {
	res.send("This is the registration!");
});

confirmationRouter.post("/", confirmationController);

export default confirmationRouter;
