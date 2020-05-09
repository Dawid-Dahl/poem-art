import express from "express";
import registerRouter from "./register";
import loginRouter from "./login";
import verifyJwtRouter from "./verifyJwt";
import protectedRouter from "./protected";
import {jsonResponse} from "../utils/utils";

const apiRouter = express.Router();

apiRouter.get("/ping", (req, res, next) => {
	res.json(jsonResponse(true, "Pong!"));
	next();
});

apiRouter.use("/register", registerRouter);
apiRouter.use("/login", loginRouter);
apiRouter.use("/verify-jwt", verifyJwtRouter);
apiRouter.use("/protected", protectedRouter);

export default apiRouter;
