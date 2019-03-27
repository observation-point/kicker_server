import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { generatePasswordHash, getSalt } from "../../components/crypto";
import { Player } from "./Player";
import { UserAttributes } from "../types";


export class User {

	public id: string;
	public firstName: string;
	public lastName: string;
	public avatar: string;

	public login: string;
	public password: string;

	public serialize(): UserAttributes {
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
