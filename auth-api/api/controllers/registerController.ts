import {Request, Response} from "express";
import {validationResult} from "express-validator";
import sqlite from "sqlite3";
import {Tables} from "../types/enums";
import bcrypt from "bcrypt";
import {authJsonResponse, generateId} from "../utils/utils";
import fetch from "node-fetch";

export const registerController = (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (errors.isEmpty()) {
		const dbPath = process.env.DB_PATH || "";

		const db = new sqlite.Database(dbPath, err =>
			err ? console.error(err) : console.log("Connected to the SQLite database")
		);

		bcrypt.hash(req.body.password, 10, (err, hash) => {
			if (err) {
				console.error(err);
				return;
			}

			fetch(`${process.env.MAIN_FETCH_URL}/api/ping`)
				.then(() => {
					const id = generateId();
					const sql = `INSERT INTO ${Tables.auth_users} (id, email, password) VALUES (?, ?, ?)`;
					const values = [id, req.body.email, hash];

					db.run(sql, values, async err => {
						if (err) {
							const errorMsg = err.message.includes(
								"UNIQUE constraint failed: AuthUsers.email"
							)
								? "A user with that email is already registered."
								: "Couldn't register user.";

							res.status(403).json(authJsonResponse(false, {message: errorMsg}));

							db.close(err =>
								err
									? console.error(err)
									: console.log("Closed the database connection")
							);
						} else {
							try {
								await fetch(`${process.env.MAIN_FETCH_URL}/api/create-user`, {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({id, username: req.body.username}),
								});

								res.status(200).json(
									authJsonResponse(true, {
										message:
											"Registration successful. Welcome! You can now log in!",
									})
								);
							} catch (e) {
								console.error(e);
							}

							db.close(err =>
								err
									? console.error(err)
									: console.log("Closed the database connection")
							);
						}
					});
				})
				.catch(e => {
					console.error("Could not connect to main API. No user created --", e);

					res.status(200).json(
						authJsonResponse(false, {
							message: "Registration is not possible right now. Sorry!",
						})
					);
				});
		});
	} else {
		res.status(422).send("Invalid Registration, try again!");
	}
};
