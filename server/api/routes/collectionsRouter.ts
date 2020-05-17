import express from "express";
import {addCollectionController} from "../controllers/addCollectionController";

const collectionsRouter = express.Router();

collectionsRouter.post("/add", addCollectionController);

export default collectionsRouter;
