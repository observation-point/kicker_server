import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { Game } from "./Game";
import { Role, Side } from "./types";
import { User } from "./User";

@Entity("player")
export class Player {
	@PrimaryColumn()
	public id: string;

	@Column("user_id")
	public userId: string;

	@Column("game_id")
	public gameId: string;

	@Column()
	public side: Side;

	@Column()
	public role: Role;

	@ManyToOne((type) => User, (user) => user.played)
	public user: User;

	@ManyToOne((type) => Game, (game) => game.players)
	public game: Game;

	public constructor(gameId: string, side: Side, role: Role, user: User) {
		this.id = v4();
		this.gameId = gameId;
		this.userId = user.id;
		this.side = side;
		this.role = role;
		this.user = user;
	}
}
