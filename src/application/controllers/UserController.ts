import { Body, JsonController, Post, Session } from "routing-controllers";

import { Inject } from "typedi";
import { generatePasswordHash } from "../../components/crypto";
import { Session as ExpressSession } from "../../components/middlewares/Session";
import { User } from "../../infrastructure/entities";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { UserResponse } from "../types";
import { CreateUserForm } from "../validation/CreateUserForm";
import { UserView } from "../view/UserView";

@JsonController("/api/user")
export class UserController {

	@Inject()
	private userRepository: UserRepository;

	@Post("/")
	public async createUser(
		@Session() session: ExpressSession,
		@Body() form: CreateUserForm
	): Promise<UserResponse> {
		const { password, ...data } = form;
		const hashPassword = generatePasswordHash(password);
		const user = new User({ ...data, password: hashPassword });
		await this.userRepository.save(user);
		session.user = user.serialize();

		return UserView.makeResponse(user);
	}
}
