import { Body, Get, JsonController, OnUndefined, Post, Put } from "routing-controllers";

import { plainToClass } from "class-transformer";
import { generatePasswordHash, getSalt } from "../components/crypto";
import { GetSessionFromRequest } from "../components/decorators/GetSessionFromRequest";
import { Session } from "../components/middlewares/Session";
import { User } from "../infrastructure/entities";
import { userService } from "../infrastructure/services/UserService";
import { UserResponse } from "./types";
import { CreateUserForm } from "./validation/CreateUserForm";
import { LoginParamForm } from "./validation/LoginParamForm";
import { UserView } from "./view/UserView";

@JsonController("/user")
export class UserController {

	@Post("/")
	public async createUser(
		@GetSessionFromRequest() session: Session,
		@Body() form: CreateUserForm
	): Promise<UserResponse> {
		const { password, ...data } = form;

		const hashPassword = generatePasswordHash(password);

		const user = await userService.save(plainToClass(User, { ...data, password: hashPassword }));

		session.user = user.serialize();

		return UserView.makeResponse(user);
	}
}
