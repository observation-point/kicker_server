import { User } from "../../infrastructure/entities";
import { UserResponse } from "../types";

export class UserView {
	public static makeResponse(user: User): UserResponse {

		return {
			user: user.serialize()

		};
	}

}
