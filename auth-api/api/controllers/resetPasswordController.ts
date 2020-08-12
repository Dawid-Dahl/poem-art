import path from "path";
import fs from "fs";
import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import sqlite from "sqlite3";
import {Tables} from "../types/enums";
import {authJsonResponse, closeSqliteConnection, extractPayloadFromBase64JWT} from "../utils/utils";
import {config} from "dotenv";
import {validationResult} from "express-validator";
import bcrypt from "bcrypt";

config({
	path: "../../.env",
});

const PUB_KEY_PATH = path.join(__dirname, "../..", "cryptography", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(PUB_KEY_PATH, "utf8");

export const resetPasswordController = (req: Request, res: Response) => {
	const errors = validationResult(req);

	const {password, resetToken}: {password: string; resetToken: string} = req.body;

	const resetTokenPayload = extractPayloadFromBase64JWT(resetToken);

	const userId = resetTokenPayload?.sub as string;

	if (!userId) {
		throw new Error("No user ID could be found in the resetToken");
	}

	if (errors.isEmpty()) {
		jwt.verify(resetToken, PUB_KEY, (err, decodedJwt) => {
			if (err) {
				console.log(err);
				res.status(500).json(
					authJsonResponse(false, {
						message: "Something went wrong while verifying the resetToken",
					})
				);
			} else {
				if (decodedJwt) {
					bcrypt.hash(password, 10, async (err, hash) => {
						if (err) {
							console.error(err);
							return;
						}

						const dbPath = process.env.DB_PATH || "";

						const db = new sqlite.Database(dbPath, err =>
							err
								? console.error(err)
								: console.log("Connected to the SQLite database")
						);

						const sql = `UPDATE ${Tables.auth_users} SET password=? WHERE id=?`;
						const values = [hash, userId];

						db.run(sql, values, err => {
							if (err) {
								res.status(500).json(
									authJsonResponse(false, {
										message:
											"Something went wrong while updating the password!",
									})
								);
							}

							res.status(200).json(
								authJsonResponse(true, {
									message: `Your password has been changed! You may now login!`,
								})
							);
						});

						closeSqliteConnection(db);
					});
				} else {
					res.status(500).json(
						authJsonResponse(false, {
							message: "Something went wrong while verifying the email",
						})
					);
				}
			}
		});
	} else {
		res.status(422).send("Invalid Registration, try again!");
	}
};
