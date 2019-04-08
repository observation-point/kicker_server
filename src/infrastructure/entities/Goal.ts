import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { Team } from "../types";

export class Goal {

	public id: string;

	public gameId: string;

	public team: Team;

	public time: Date;

	public constructor(gameId: string, team: Team, time: Date) {
		this.id = v4(),
		this.gameId = gameId,
		this.team = team,
		this.time = time;
	}
}
