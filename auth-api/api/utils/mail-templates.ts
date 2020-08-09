import Mail from "nodemailer/lib/mailer";

export const verificationEmail = () => ({
	create(email: string, jwt: string): Mail.Options {
		return {
			from: "artpoememailservice@gmail.com",
			to: email,
			subject: "Verify Your ArtPoem Account",
			text: `Please click this link to confirm your email: ${jwt}`,
		};
	},
});
