import { User } from "../../infrastructure/entities";
import { UserResponse } from "../types";

export class UserView {
	public static makeResponse(user: User): UserResponse {

		return {
			user: user.serialize()

		};
	}

	public static makeResponseForBot(user: User, passwordOrigin: string): UserResponse {
		return {
			user: {
				...user.serialize(),
				password: passwordOrigin
			}
		};
	}

}
