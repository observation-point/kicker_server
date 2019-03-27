import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { GameModel } from "./GameModel";
import { Side } from "../types";

@Entity("goal")
export class GoalModel {
	@PrimaryColumn()
	public id: string;

	@Column("varchar")
	public gameId: string;

	@Column()
	public side: Side;

	@Column()
	public time: Date;

	@ManyToOne((type) => GameModel, (game) => game.goals)
	public game: GameModel;
}
