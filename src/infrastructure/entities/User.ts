import { generatePasswordHash, getSalt } from "../../components/crypto";
import { UserModel } from "../models";
import { UserAttributes } from "../types";

export class User {

	public id: string;
	public firstName: string;
	public lastName: string;
	public avatar: string;

	public login: string;
	public password: string;

	public constructor(userModel: {
		id: string,
		firstName: string,
		lastName: string,
		login: string,
		password: string,
		avatar: string
	}) {
		const { id, firstName, lastName, login, password, avatar = "" } = userModel;

		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.avatar = avatar;
		this.login = login;
		this.password = password;

	}

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

	public getScheme() {
		return {
			id: this.id,
			firstName: this.firstName,
			lastNmae: this.lastName,
			login: this.login,
			password: this.password,
			avatar: this.avatar
		};
	}

}
