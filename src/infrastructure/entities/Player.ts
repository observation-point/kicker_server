import { v4 } from "uuid";
import { Role, Side } from "../types";
import { User } from "./User";

export class Player {
	public id: string;

	public gameId: string;
	
	public user: User;
	public side: Side;
	public role: Role;

	public constructor(data: { gameId: string, side: Side, role: Role, user: User }) {
		this.id = v4();
		this.gameId = data.gameId;
		this.user = data.user;
		this.side = data.side;
	}

	public getScheme() {
		return {
			id: this.id,
			gameId: this.gameId,
			userId: this.user.id,
			side: this.side,
			role: this.role
		};
	}
}
