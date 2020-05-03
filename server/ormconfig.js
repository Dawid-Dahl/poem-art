module.exports = [
	{
		name: process.env.NODE_ENV || "default",
		type: "mysql",
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		synchronize: true,
		logging: true,
		entities: ["db/entities/**/*.ts"],
		migrations: ["db/migrations/**/*.ts"],
		subscribers: ["db/subscribers/**/*.ts"],
		cli: {
			entitiesDir: "db/entities",
			migrationsDir: "db/migrations",
			subscribersDir: "db/subscribers",
		},
	},
];
