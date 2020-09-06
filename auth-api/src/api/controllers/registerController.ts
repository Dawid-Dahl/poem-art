import path from "path";
import fs from "fs";
import {Request, Response} from "express";
import {validationResult} from "express-validator";
import sqlite from "sqlite3";
import {Tables} from "../types/enums";
import bcrypt from "bcrypt";
import {
	authJsonResponse,
	generateId,
	issueAccessToken,
	closeSqliteConnection,
} from "../utils/utils";
import fetch from "node-fetch";
import {sendEmail} from "../utils/nodemailer";
import {verificationEmail} from "../utils/mail-templates";

export const registerController = async (req: Request, res: Response) => {
	const errors = validationResult(req);

	const id = generateId();
	const PRIV_KEY_PATH = path.join(__dirname, "../../", "cryptography", "id_rsa_priv.pem");
	const PRIV_KEY = fs.readFileSync(PRIV_KEY_PATH, "utf8");

	const xToken = await issueAccessToken(id, PRIV_KEY, "30d").catch(err => console.log(err));

	if (!xToken) throw new Error("Something went wrong while issueing the access token!");

	const sendVerificationEmail = sendEmail(verificationEmail().create(req.body.email, xToken));

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

						closeSqliteConnection(db);
					} else {
						try {
							await fetch(`${process.env.MAIN_FETCH_URL}/api/users/create`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({id, username: req.body.username}),
							});

							sendVerificationEmail();

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
						closeSqliteConnection(db);
					}
				});
			} catch (e) {
				console.error("Could not connect to main API. No user created --", e);

				res.status(200).json(
					authJsonResponse(false, {
						message: "Registration is not possible right now. Sorry!",
					})
				);

				closeSqliteConnection(db);
			}
		});
	} else {
		res.status(422).send("Invalid Registration, try again!");
	}
};