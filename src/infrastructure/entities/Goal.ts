import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { Game } from "./Game";
import { Role, Side } from "./types";
import { User } from "./User";

@Entity("goal")
export class Goal {
	@PrimaryColumn()
	public id: string;

	@Column("varchar")
	public gameId: string;

	@Column()
	public side: Side;

	@Column()
	public time: Date;

	@ManyToOne((type) => Game, (game) => game.goals)
	public game: Game;

	public constructor(gameId: string, side: Side, time: Date) {
		this.id = v4(),
		this.gameId = gameId,
		this.side = side,
		this.time = time;
	}
}
