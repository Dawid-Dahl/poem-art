import express from "express";
import {deleteUserAccountAndDataController} from "../controllers/account/deleteUserAccountAndDataController";

const accountRouter = express.Router();

accountRouter.delete("/delete", deleteUserAccountAndDataController);

export default accountRouter;
