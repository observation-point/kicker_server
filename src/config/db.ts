import { ConnectionOptions } from "typeorm";
import { User } from "../infrastructure/entities";

export const dbConfig: ConnectionOptions = {
	type: "postgres",
	host: "localhost",
	username: "kickerman",
	password: "123qwe",
	database: "kicker",
	entities: [
		User
	],
	migrations: [
		"dist/infrastructure/migrations/*.js"
	],
	logging: ["error"]
};
