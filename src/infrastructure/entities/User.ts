import { generatePasswordHash, getSalt } from "../../components/crypto";
import { UserAttributes } from "../types";

export class User {

	public id: string;
	public fullname: string;
	public avatar: string;
	public rating: number;

	public login: string;
	public password: string;
	public token: string;

	public constructor(userModel: {
		id: string,
		fullname: string,
		avatar: string,
		rating: number,
		login: string,
		password: string,
		token: string
	}) {
		const { id, fullname, login, password, avatar = "", rating, token } = userModel;

		this.id = id;
		this.fullname = fullname;
		this.avatar = avatar;
		this.rating = rating;
		this.login = login;
		this.password = password;
		this.token = token;
	}

	public serialize(): UserAttributes {
		return {
			id: this.id,
			login: this.login,
			fullname: this.fullname,
			avatar: this.avatar,
			rating: this.rating,
			token: this.token
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
			fullname: this.fullname,
			avatar: this.avatar,
			rating: this.rating,
			login: this.login,
			password: this.password,
			token: this.token
		};
	}

	public changeRating(newRating: number) {
		this.rating = newRating;
	}
}
