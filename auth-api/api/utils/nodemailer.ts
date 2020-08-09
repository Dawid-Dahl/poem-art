import nodemailer from "nodemailer";
import {config} from "dotenv";
import Mail from "nodemailer/lib/mailer";

config({
	path: "../../.env",
});

export const sendVerificationEmail = async (email: string) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_TRANSPORT_USER, // generated ethereal user
				pass: process.env.EMAIL_TRANSPORT_PASSWORD, // generated ethereal password
			},
		});

		const mailOptions: Mail.Options = {
			from: "artpoememailservice@gmail.com",
			to: email,
			subject: "Testing from code",
			text: "Teeeest2!",
		};

		const info = await transporter.sendMail(mailOptions);

		console.log("Email sent: ", info.messageId);
	} catch (e) {
		console.log("Something went wrong while sending the email!");
		console.error(e);
	}
};

sendVerificationEmail("dawiddahl@gmail.com");
