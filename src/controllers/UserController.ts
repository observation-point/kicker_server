import { Body, Get, JsonController, OnUndefined, Post, Put } from "routing-controllers";

import { generatePasswordHash, getSalt } from "../components/crypto";
import { User } from "../domain/User/User";
import { userRepository } from "../infrastructure/User/UserRepository";
import { CreateUserForm } from "./validation/CreateUserForm";
import { LoginParamForm } from "./validation/LoginParamForm";
import { UserView } from "./view/UserView";
import { UserResponse } from "./types";
import { GetSessionFromRequest } from "../components/decorators/GetSessionFromRequest";
import { Session } from "../components/middlewares/Session";

@JsonController("/user")
export class UserController {

	@Post("/")
	public async createUser(
		@GetSessionFromRequest() session: Session,
		@Body() form: CreateUserForm
	): Promise<UserResponse> {
		const { password, ...data } = form;

		const hashPassword = generatePasswordHash(password);

		const user = await userRepository.save({ ...data, password: hashPassword });

		const { password: pswd, ...param } = user;

		session.user = param;

		return UserView.makeResponse(user);
	}
}
