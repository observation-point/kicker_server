import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { Game } from "./Game";
import { Role, Side } from "./types";
import { User } from "./User";

@Entity("player")
export class Player {
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

	@ManyToOne((type) => User, (user) => user.players)
	public user: User;

	@ManyToOne((type) => Game, (game) => game.players)
	public game: Game;

	public constructor(data: { gameId: string, side: Side, role: Role, user: User }) {
		this.id = data ? v4() : undefined;
		this.gameId = data ? data.gameId : undefined;
		this.userId = data ? data.user.id : undefined;
		this.side = data ? data.side : undefined;
		this.role = data ? data.role : undefined;
		this.user = data ? data.user : undefined;
	}
}
