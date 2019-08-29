import { Body, JsonController, Post, Session } from "routing-controllers";

import { Inject } from "typedi";
import { v4 } from "uuid";
import { generatePasswordHash } from "../../components/crypto";
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
		@Session() session: Express.Session,
		@Body() form: CreateUserForm
	): Promise<UserResponse> {
		const id = v4();
		const { password, ...data } = form;
		const hashPassword = generatePasswordHash(password);
		const user = new User({ ...data, id, password: hashPassword, rating: 1500, token: v4() });
		await this.userRepository.save(user);

		session.user = { id: user.id };

		return UserView.makeResponse(user);
	}

}
