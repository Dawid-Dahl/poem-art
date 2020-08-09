import path from "path";
import fs from "fs";
import {Request, Response, NextFunction} from "express";
import bcrypt from "bcrypt";
import sqlite from "sqlite3";
import {Tables} from "../types/enums";
import {SQLRefreshToken, AuthUser} from "../types/types";
import {
	issueAccessToken,
	issueRefreshToken,
	addRefreshTokenToDatabase,
	extractPayloadFromBase64JWT,
	constructUserWithoutPasswordFromSqlResult,
	authJsonResponse,
} from "../utils/utils";

const PRIV_KEY_PATH = path.join(__dirname, "../../", "cryptography", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(PRIV_KEY_PATH, "utf8");

export const confirmationController = (req: Request, res: Response, next: NextFunction) => {};
