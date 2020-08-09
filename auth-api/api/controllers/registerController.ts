import {Request, Response} from "express";
import {validationResult} from "express-validator";
import sqlite from "sqlite3";
import {Tables} from "../types/enums";
import bcrypt from "bcrypt";
import {authJsonResponse, generateId} from "../utils/utils";
import fetch from "node-fetch";
import {sendVerificationEmail} from "../utils/nodemailer";

export const registerController = async (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (errors.isEmpty()) {
		const dbPath = process.env.DB_PATH || "";

		const db = new sqlite.Database(dbPath, err =>
			err ? console.error(err) : console.log("Connected to the SQLite database")
		);

		bcrypt.hash(req.body.password, 10, async (err, hash) => {
			if (err) {
				console.error(err);
				return;
			}

			try {
				await fetch(`${process.env.MAIN_FETCH_URL}/api/ping`);

				const id = generateId();
				const sql = `INSERT INTO ${Tables.auth_users} (id, email, password) VALUES (?, ?, ?)`;
				const values = [id, req.body.email, hash];

				db.run(sql, values, async err => {
					if (err) {
						console.log(err);

						const errorMsg = err.message.includes(
							"UNIQUE constraint failed: Auth_Users.email"
						)
							? "A user with that email is already registered."
							: "Couldn't register user.";

						res.status(403).json(authJsonResponse(false, {message: errorMsg}));

						db.close(err =>
							err ? console.error(err) : console.log("Closed the database connection")
						);
					} else {
						try {
							await fetch(`${process.env.MAIN_FETCH_URL}/api/users/create`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({id, username: req.body.username}),
							});

							sendVerificationEmail(req.body.email);

							res.status(200).json(
								authJsonResponse(true, {
									message:
										"Almost done! Complete your registration by clicking the verification link in the email sent to your inbox!",
								})
							);
						} catch (e) {
							console.error("Could not connect to main API. No user created --", e);

							res.status(200).json(
								authJsonResponse(false, {
									message: "Registration is not possible right now. Sorry!",
								})
							);
						}
						db.close(err =>
							err ? console.error(err) : console.log("Closed the database connection")
						);
					}
				});
			} catch (e) {
				console.error("Could not connect to main API. No user created --", e);

				res.status(200).json(
					authJsonResponse(false, {
						message: "Registration is not possible right now. Sorry!",
					})
				);

				db.close(err =>
					err ? console.error(err) : console.log("Closed the database connection")
				);
			}
		});
	} else {
		res.status(422).send("Invalid Registration, try again!");
	}
};
