import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { Side } from "../types";


export class Goal {

	public id: string;

	public gameId: string;

	public side: Side;

	public time: Date;

	public constructor(gameId: string, side: Side, time: Date) {
		this.id = v4(),
		this.gameId = gameId,
		this.side = side,
		this.time = time;
	}
}
