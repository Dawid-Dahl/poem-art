require("dotenv").config({
	path: "../../../.env",
});

const config = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		socketPath: process.env.DB_SOCKET_PATH,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT,
	},
	test: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		socketPath: process.env.DB_SOCKET_PATH,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT,
	},
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		socketPath: process.env.DB_SOCKET_PATH,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT,
	},
};

module.exports = config[process.env.NODE_ENV];
