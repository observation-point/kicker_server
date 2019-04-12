import { Body, Get, JsonController, Post, QueryParam, Session, UseBefore } from "routing-controllers";

import * as randomstring from "randomstring";
import { Inject } from "typedi";
import { v4 } from "uuid";
import { generatePasswordHash } from "../../components/crypto";
import { CheckBotToken } from "../../components/middlewares/CheckBotToken";
import { Session as ExpressSession } from "../../components/middlewares/Session";
import { User } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { Role } from "../../infrastructure/types";
import { UserResponse, UserStats } from "../types";
import { CreateUserFormBot } from "../validation/CreateUserFormBot";
import { UserView } from "../view/UserView";

@JsonController("/private/api")
export class BotController {
	@Inject() private gameRepository: GameRepository;
	@Inject() private userRepository: UserRepository;

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

		const token = v4();

		let user = new User({ ...form, id, token, password: hashPassword, rating: 1500 });
		try {
			await this.userRepository.save(user);
			return UserView.makeResponseForBot(user, password);
		} catch (error) {
			user = await this.userRepository.getUserByLogin(user.login);
			user.token = token;
			user = await this.userRepository.update(user);
			return UserView.makeResponse(user);
		}

	}

	@Get("/user/stats")
	@UseBefore(CheckBotToken)
	public async getUserStats(@QueryParam("login", { required: true }) userLogin: string): Promise<UserStats> {
		const user = await this.userRepository.getUserByLogin(userLogin);
		const userId = user.id;
		const [gamesCount, winsInAttack, winsInDefense] = await Promise.all([
			this.gameRepository.getGameCount(userId),
			this.gameRepository.getWinCount(userId, Role.Attack),
			this.gameRepository.getWinCount(userId, Role.Defense)
		]);

		return {
			userId: user.id,
			avatar: user.avatar,
			fullname: user.fullname,
			rating: user.rating,
			gamesCount,
			winsInAttack,
			winsInDefense
		};
	}

}
