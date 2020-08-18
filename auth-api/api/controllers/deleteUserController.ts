import path from "path";
import fs from "fs";
import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import sqlite from "sqlite3";
import {Tables} from "../types/enums";
import {DecodedJwt} from "../types/types";
import {authJsonResponse, closeSqliteConnection} from "../utils/utils";

const PUB_KEY_PATH = path.join(__dirname, "../..", "cryptography", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(PUB_KEY_PATH, "utf8");

export const deleteUserController = (req: Request, res: Response, next: NextFunction) => {
	jwt.verify(req.params.token, PUB_KEY, (err, decodedJwt) => {
		if (err) {
			console.log(err);
			res.status(500).json(
				authJsonResponse(false, {
					message: "Something went wrong while trying to delete the user",
				})
			);
		} else {
			try {
				const dbPath = process.env.DB_PATH || "";

				const db = new sqlite.Database(dbPath, err =>
					err ? console.error(err) : console.log("Connected to the SQLite database")
				);

				const sql = `DELETE FROM ${Tables.auth_users} WHERE id = ?`;
				const values = [(decodedJwt as DecodedJwt).sub];

				db.run(sql, values, err => {
					if (err) {
						throw new Error("There was an error while trying to delete the user");
					}

					res.status(204).json(
						authJsonResponse(true, {
							message: "User has been deleted completely.",
						})
					);
				});

				closeSqliteConnection(db);
			} catch (e) {
				console.log(e);
				res.status(500).json(
					authJsonResponse(false, {
						message: "Something went wrong while verifying the email",
					})
				);
			}
		}
	});
};
