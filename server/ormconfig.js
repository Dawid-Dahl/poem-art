module.exports = {
	type: "mysql",
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: false,
	entities: ["api/db/entities/**/*.ts"],
	migrations: ["api/db/migrations/**/*.ts"],
	subscribers: ["api/db/subscribers/**/*.ts"],
	cli: {
		entitiesDir: "api/db/entities",
		migrationsDir: "api/db/migrations",
		subscribersDir: "api/db/subscribers",
	},
};
