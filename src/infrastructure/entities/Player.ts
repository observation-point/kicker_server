import { v4 } from "uuid";
import { Role, Team } from "../types";
import { User } from "./User";

export class Player {
	public id: string;

	public gameId: string;

	public user: User;
	public team: Team;
	public role: Role;

	public constructor(data: { gameId: string, team: Team, role: Role, user: User }) {
		this.id = v4();
		this.gameId = data.gameId;
		this.user = data.user;
		this.role = data.role;
		this.team = data.team;
	}

	public getScheme() {
		return {
			id: this.id,
			gameId: this.gameId,
			userId: this.user.id,
			team: this.team,
			role: this.role
		};
	}
}
