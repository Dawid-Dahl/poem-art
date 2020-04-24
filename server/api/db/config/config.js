require("dotenv").config({
	path: "../../.env",
});

module.exports = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		socketPath: process.env.DB_SOCKET_PATH,
		port: process.env.DB_PORT,
		dialect: "mysql",
	},
	test: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		socketPath: process.env.DB_SOCKET_PATH,
		port: process.env.DB_PORT,
		dialect: "mysql",
	},
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		socketPath: process.env.DB_SOCKET_PATH,
		port: process.env.DB_PORT,
		dialect: "mysql",
	},
};
