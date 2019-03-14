import { ConnectionOptions } from "typeorm";
import { UserModel } from "../infrastructure/User/model/UserModel";

export const dbConfig: ConnectionOptions = {
	type: "postgres",
	host: "localhost",
	username: "gorod",
	password: "123qwe",
	database: "kicker",
	entities: [
		UserModel
	],
	migrations: [
		"dist/infrastructure/migrations/*.js"
	],
	logging: ["error"]
};
