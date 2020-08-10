import path from "path";
import fs from "fs";
import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sqlite from "sqlite3";
import {Tables} from "../types/enums";
import {SQLRefreshToken, AuthUser, xRefreshTokenPayload, DecodedJwt} from "../types/types";
import {
	issueAccessToken,
	issueRefreshToken,
	addRefreshTokenToDatabase,
	extractPayloadFromBase64JWT,
	constructUserWithoutPasswordFromSqlResult,
	authJsonResponse,
} from "../utils/utils";
import {config} from "dotenv";

config({
	path: "../../.env",
});

const PUB_KEY_PATH = path.join(__dirname, "../..", "cryptography", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(PUB_KEY_PATH, "utf8");

export const confirmationController = (req: Request, res: Response, next: NextFunction) => {
	jwt.verify(req.params.token, PUB_KEY, (err, decodedJwt) => {
		if (err) {
			console.log(err);
			res.status(500).json(
				authJsonResponse(false, {
					message: "Something went wrong while verifying the email",
				})
			);
		} else {
			if (decodedJwt) {
				const dbPath = process.env.DB_PATH || "";

				const db = new sqlite.Database(dbPath, err =>
					err ? console.error(err) : console.log("Connected to the SQLite database")
				);

				const sql = `UPDATE ${Tables.auth_users} SET isVerified = ? WHERE id = ?`;
				const values = [1, (decodedJwt as DecodedJwt).sub];

				db.run(sql, values, err => {
					if (err) {
						throw new Error("There was an error updating the isVerified field");
					}

					res.status(200).send(
						`
                            <h1>Thank you for verifying your account. You may now <a href="${process.env.FRONTEND_URL}/login">log in</a>!</h1>
                        `
					);
				});
				db.close(err =>
					err ? console.error(err) : console.log("Closed the database connection")
				);
			} else {
				res.status(500).json(
					authJsonResponse(false, {
						message: "Something went wrong while verifying the email",
					})
				);
			}
		}
	});
};
