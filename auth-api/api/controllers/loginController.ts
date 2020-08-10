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

export const loginController = (req: Request, res: Response, next: NextFunction) => {
	const dbPath = process.env.DB_PATH || "";

	const db = new sqlite.Database(dbPath, err =>
		err ? console.error(err) : console.log("Connected to the SQLite database")
	);

	const sql = `SELECT * FROM ${Tables.auth_users} WHERE email = ?`;

	db.get(sql, req.body.email, async (err, row: AuthUser) => {
		if (!err) {
			if (!row) {
				res.status(401).json(
					authJsonResponse(false, {message: "No user with this password exists."})
				);
				return;
			}

			if (row.isVerified === 0) {
				res.status(401).json(
					authJsonResponse(false, {
						message:
							"You need to verify your account before logging in! Simply click the verification link in email we sent you.",
					})
				);
				return;
			}

			const isMatch = await bcrypt.compare(req.body.password, row.password!);

			if (isMatch) {
				const user = constructUserWithoutPasswordFromSqlResult(row);

				const xTokenPromise = issueAccessToken(user.id, PRIV_KEY);
				const xRefreshTokenPromise = issueRefreshToken(user, PRIV_KEY);

				Promise.all([xTokenPromise, xRefreshTokenPromise])
					.then(values => {
						const [xTokenFromPromise, xRefreshTokenFromPromise] = values;

						const refreshTokenPayload = extractPayloadFromBase64JWT(
							xRefreshTokenFromPromise
						);

						if (refreshTokenPayload) {
							const sqlRefreshToken: SQLRefreshToken = {
								sub: refreshTokenPayload.sub,
								iat: refreshTokenPayload.iat,
								xRefreshToken: xRefreshTokenFromPromise,
							};

							addRefreshTokenToDatabase(sqlRefreshToken);

							res.status(200).json(
								authJsonResponse(
									true,
									{
										message: "Tokens generated!",
										user: {id: refreshTokenPayload.sub.toString()},
									},
									xTokenFromPromise,
									xRefreshTokenFromPromise
								)
							);
						} else {
							throw new Error(
								"For some reason the x-refresh-token was undefined and therefore couldn't be added to the database."
							);
						}
					})
					.catch(err => next(err));
			} else {
				res.status(401).json(
					authJsonResponse(false, {
						message: "Couldn't log in. Did you type in the wrong password?",
					})
				);
			}
		} else {
			res.status(503).json(
				authJsonResponse(false, {message: "Service unavailable at the moment."})
			);
		}
	});
	db.close(err => (err ? console.error(err) : console.log("Closed the database connection")));
};
