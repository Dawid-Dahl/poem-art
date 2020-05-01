import express from "express";
import apiRouter from "./api/routes/api";
import "dotenv/config";
import cors from "cors";
import errorhandler from "errorhandler";
import morgan from "morgan";
import verifyXToken from "./api/middleware/verifyXToken";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./api/db/entities/entity";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:1234",
	})
);
app.use(morgan("dev"));
/* app.use(verifyXToken); */

app.use("/api", apiRouter);

app.use(errorhandler());

createConnection()
	.then(async connection => {
		const user = new User();
		user.firstName = "Timber";
		user.lastName = "Saw";
		user.age = 25;
		await connection.manager.save(user);

		console.log("Saved a new user with id: " + user.id);

		console.log("Loading users from the database...");
		const users = connection.manager.find(User);
		console.log("Loaded users: ", users);

		app.listen(PORT, () => console.log(`Server now listening at port: ${PORT}`));
	})
	.catch(err => console.log(err));
