import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { generatePasswordHash, getSalt } from "../../components/crypto";
import { PlayerModel } from "./PlayerModel";
import { UserAttributes } from "../types";

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

	@OneToMany((type) => PlayerModel, (player) => player.user)
	public players: PlayerModel[];

	@Column()
	private login: string;

	@Column()
	private password: string;

}
