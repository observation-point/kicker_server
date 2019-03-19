import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { generatePasswordHash, getSalt } from "../../components/crypto";
import { Player } from "./Player";
import { UserAttrib } from "./types";

@Entity("kicker_user")
export class User {

	@PrimaryColumn()
	public id: string;

	@Column()
	public firstName: string;

	@Column()
	public lastName: string;

	@Column()
	public avatar: string;

	@OneToMany((type) => Player, (player) => player.user)
	public players: Player[];

	@Column()
	private login: string;

	@Column()
	private password: string;

	public serialize(): UserAttrib {
		return {
			id: this.id,
			firstName: this.firstName,
			lastName: this.lastName,
			avatar: this.avatar
		};
	}

	public checkPass(password: string): boolean {
		const salt = getSalt(this.password);
		const hashPassword = generatePasswordHash(password, salt);

		return this.password === hashPassword;

	}

}
