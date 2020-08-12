import path from "path";
import fs from "fs";
import {Request, Response} from "express";
import sqlite from "sqlite3";
import {Tables} from "../types/enums";
import {AuthUser} from "../types/types";
import {authJsonResponse, issueAccessToken, closeSqliteConnection} from "../utils/utils";
import {sendEmail} from "../utils/nodemailer";
import {resetPasswordEmail} from "../utils/mail-templates";

export const forgotMyPasswordController = async (req: Request, res: Response) => {
	const PRIV_KEY_PATH = path.join(__dirname, "../../", "cryptography", "id_rsa_priv.pem");
	const PRIV_KEY = fs.readFileSync(PRIV_KEY_PATH, "utf8");

	const dbPath = process.env.DB_PATH || "";

	const db = new sqlite.Database(dbPath, err =>
		err ? console.error(err) : console.log("Connected to the SQLite database")
	);

	const sql = `SELECT id from ${Tables.auth_users} WHERE email = ?`;
	const values = [req.body.email];

	db.get(sql, values, async (err, row: {id: string}) => {
		if (err) {
			throw new Error("There was an error getting the id");
		}

		if (row) {
			try {
				const xToken = await issueAccessToken(row.id, PRIV_KEY, "1h");

				if (!xToken)
					throw new Error("Something went wrong while issueing the access token!");

				const sendResetPasswordEmail = sendEmail(
					resetPasswordEmail().create(req.body.email, xToken)
				);

				sendResetPasswordEmail();

				res.status(200).json(
					authJsonResponse(true, {
						message: "Check your email to reset your password! You have 1h to do this.",
					})
				);

				closeSqliteConnection(db);
			} catch (e) {
				console.log(e);
				closeSqliteConnection(db);
				res.status(500).json(
					authJsonResponse(false, {
						message:
							"Something went wrong server side, probably while issuing the resetToken!",
					})
				);
			}
		} else {
			res.status(404).json(
				authJsonResponse(false, {
					message: "No user associated with that email could be found!",
				})
			);

			closeSqliteConnection(db);
		}
	});
};
