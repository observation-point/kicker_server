import { Body, Get, JsonController, OnUndefined, Post, Put } from "routing-controllers";

import { plainToClass } from "class-transformer";
import { generatePasswordHash, getSalt } from "../components/crypto";
import { GetSessionFromRequest } from "../components/decorators/GetSessionFromRequest";
import { Session } from "../components/middlewares/Session";
import { User } from "../infrastructure/entities";
import { userRepository } from "../infrastructure/repository/UserRepository";
import { UserResponse } from "./types";
import { CreateUserForm } from "./validation/CreateUserForm";
import { UserView } from "./view/UserView";

@JsonController("/api/user")
export class UserController {

	@Post("/")
	public async createUser(
		@GetSessionFromRequest() session: Session,
		@Body() form: CreateUserForm
	): Promise<UserResponse> {
		const { password, ...data } = form;

		const hashPassword = generatePasswordHash(password);

		const user = await userRepository.save(plainToClass(User, { ...data, password: hashPassword }));

		session.user = user.serialize();

		return UserView.makeResponse(user);
	}
}
