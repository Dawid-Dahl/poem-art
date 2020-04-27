import {Request, Response} from "express";
import {validationResult} from "express-validator";
import sqlite from "sqlite3";
import {Tables} from "../types/enums";
import bcrypt from "bcrypt";
import {User} from "../types/types";
import {authJsonResponse} from "../utils/utils";

export const registerController = (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (errors.isEmpty()) {
		const dbPath = process.env.DB_PATH || "";

		const db = new sqlite.Database(dbPath, err =>
			err ? console.error(err) : console.log("Connected to the SQLite database")
		);

		bcrypt.hash(req.body.password, 10, (err, hash) => {
			if (!err) {
				const sql = `INSERT INTO ${Tables.auth_users} (email, password) VALUES (?, ?)`;
				const values = [req.body.email, hash];

				//TODO: Send username to main server to create User in the main database.
				//req.body.username

				db.run(sql, values, err => {
					if (!err) {
						res.status(200).json(
							authJsonResponse(true, {
								message: `Registration successful. Welcome! You can now log in!`,
							})
						);
					} else {
						res.status(403).json(
							authJsonResponse(false, {message: "Couldn't register user"})
						);
					}
				});

				db.close(err =>
					err ? console.error(err) : console.log("Closed the database connection")
				);
			} else {
				console.error(err);
			}
		});
	} else {
		res.status(422).send("Invalid Registration, try again!");
	}
};
