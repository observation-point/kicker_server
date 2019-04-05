import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

import { GameStatus, Side } from "../types";
import { GoalModel } from "./GoalModel";
import { PlayerModel } from "./PlayerModel";

@Entity("game")
export class GameModel {
	@PrimaryColumn()
	public id: string;

	@Column("timestamptz")
	public startGame: Date;

	@Column("timestamptz")
	public endGame: Date;

	@Column("varchar")
	public status: GameStatus;

	@Column("varchar")
	public winner: Side;

	@OneToMany((type) => PlayerModel, (player) => player.game)
	public players: PlayerModel[];

	@OneToMany((type) => GoalModel, (goal) => goal.game)
	public goals: GoalModel[];
}
