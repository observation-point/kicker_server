import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { PlayerModel } from "./PlayerModel";

@Entity("kicker_user")
export class UserModel {

	@PrimaryColumn()
	public id: string;

	@Column()
	public firstName: string;

	@Column()
	public lastName: string;

	@Column()
	public avatar: string;

	@Column()
	public rating: number;

	@Column()
	public login: string;

	@Column()
	public password: string;

	@OneToMany((type) => PlayerModel, (player) => player.user)
	public players: PlayerModel[];

}
