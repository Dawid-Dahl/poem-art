import {Pool, QueryResult} from "pg";
import {config} from "dotenv";

config({
	path: "../../../.env",
});

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

const unconfigGetClient = (pool: Pool) => async () => {
	const client = await pool.connect();
	return client;
};

pool.on("error", err => {
	console.error("Unexpected pool error: ", err);
});

pool.on("connect", () => console.log("Connected to Node-PostgreSQL pool"));

const getClient = unconfigGetClient(pool);

/* const db = {
	query: async <T>(
		text: string,
		params: any,
		callback: (err: Error, qRes: QueryResult<T>) => void
	) => {
		const client = await pool.connect();

		const start = Date.now();
		return client.query(text, params, (err, qRes) => {
			const duration = Date.now() - start;
			console.log("Executed query", {
				text,
				duration,
				rows: qRes?.rowCount ?? 0,
				params,
				queryResult: qRes.rows,
			});
			callback(err, qRes);
		});
	},
}; */

export default getClient;
