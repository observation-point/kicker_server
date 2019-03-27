import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { Role, Side } from "../types";
import { GameModel } from "./GameModel";
import { UserModel } from "./UserModel";

@Entity("player")
export class PlayerModel {
	@PrimaryColumn()
	public id: string;

	@Column({ type: "varchar" })
	public userId: string;

	@Column({ type: "varchar" })
	public gameId: string;

	@Column("varchar")
	public side: Side;

	@Column("varchar")
	public role: Role;

	@ManyToOne((type) => UserModel, (user) => user.players)
	public user: UserModel;

	@ManyToOne((type) => GameModel, (game) => game.players)
	public game: GameModel;

}
