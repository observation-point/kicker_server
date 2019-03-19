import { ConnectionOptions } from "typeorm";
import { Game, Goal, Player, User } from "../infrastructure/entities";

export const dbConfig: ConnectionOptions = {
	type: "postgres",
	host: "localhost",
	username: "kickerman",
	password: "123qwe",
	database: "kicker",
	entities: [
		User,
		Player,
		Goal,
		Game
	],
	migrations: [
		"dist/infrastructure/migrations/*.js"
	],
	logging: ["error"]
};
