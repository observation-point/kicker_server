import { Body, JsonController, Post, Session, UseBefore } from "routing-controllers";

import * as randomstring from "randomstring";
import { Inject } from "typedi";
import { v4 } from "uuid";
import { generatePasswordHash } from "../../components/crypto";
import { CheckBotToken } from "../../components/middlewares/CheckBotToken";
import { Session as ExpressSession } from "../../components/middlewares/Session";
import { User } from "../../infrastructure/entities";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { UserResponse } from "../types";
import { CreateUserFormBot } from "../validation/CreateUserFormBot";
import { UserView } from "../view/UserView";

@JsonController("/private/api")
export class BotController {

	@Inject()
	private userRepository: UserRepository;

	@Post("/user")
	@UseBefore(CheckBotToken)
	public async createUser(
		@Session() session: ExpressSession,
		@Body() form: CreateUserFormBot
	): Promise<UserResponse> {
		const id = v4();
		const password = randomstring.generate({
			length: 6,
			charset: "alphabetic"
		}).toLowerCase();
		const hashPassword = generatePasswordHash(password);

		const user = new User({ ...form, id, password: hashPassword, rating: 1500 });
		await this.userRepository.save(user);

		return UserView.makeResponseForBot(user, password);
	}

}
