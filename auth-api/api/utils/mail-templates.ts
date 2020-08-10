import Mail from "nodemailer/lib/mailer";
import {config} from "dotenv";

config({
	path: ".env",
});

export const verificationEmail = () => ({
	create(email: string, jwt: string): Mail.Options {
		const url = `${process.env.AUTH_FETCH_URL}/api/confirmation/${jwt}`;
		return {
			from: "ArtPoem Email Service",
			to: email,
			subject: "Verify Your ArtPoem Account",
			html: `Please click <a href="${url}">this link</a> to confirm your email.`,
		};
	},
});
