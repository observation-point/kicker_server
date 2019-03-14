import { Column, Entity, PrimaryColumn } from "typeorm";
import { User } from "../../../domain/User/User";

@Entity("user")
export class UserModel implements User {

	@PrimaryColumn()
	public id: string;

	@Column()
	public login: string;

	@Column()
	public password: string;

	@Column()
	public firstName: string;

	@Column()
	public lastName: string;

	@Column()
	public avatar: string;
}
