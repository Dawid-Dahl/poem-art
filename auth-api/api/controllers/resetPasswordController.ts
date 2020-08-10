import path from "path";
import fs from "fs";
import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import sqlite from "sqlite3";
import {Tables} from "../types/enums";
import {DecodedJwt} from "../types/types";
import {authJsonResponse} from "../utils/utils";
import {config} from "dotenv";
import {validationResult} from "express-validator";

config({
	path: "../../.env",
});

const PUB_KEY_PATH = path.join(__dirname, "../..", "cryptography", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(PUB_KEY_PATH, "utf8");

export const resetPasswordController = (req: Request, res: Response) => {
	const errors = validationResult(req);

	console.log(req.body.password);
	res.end("HEY!");
};
