import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

import { GoalModel } from "./GoalModel";
import { PlayerModel } from "./PlayerModel";
import { GameStatus } from "../types";

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

	@OneToMany((type) => PlayerModel, (player) => player.game)
	public players: PlayerModel[];

	@OneToMany((type) => GoalModel, (goal) => goal.game)
	public goals: GoalModel[];
}
