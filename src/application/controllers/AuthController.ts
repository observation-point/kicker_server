import { Body, Get, JsonController, OnUndefined, Param, Post, Session } from "routing-controllers";

import { Inject } from "typedi";
import { AuthError, NotFoundError } from "../../components/http-error";
import { Session as ExpressSession} from "../../components/middlewares/Session";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { UserResponse } from "../types";
import { LoginParamForm } from "../validation/LoginParamForm";
import { UserView } from "../view/UserView";

@JsonController("/api/auth")
export class AuthController {
	@Inject()
	private userRepository: UserRepository;

	@Post("/:login")
	public async login(
		@Param("login") login: string,
		@Body() { password }: LoginParamForm,
		@Session() session: Express.Session
	): Promise<UserResponse> {
		const user = await this.userRepository.getUserByLogin(login);

		if (!user.checkPass(password)) {
			throw new AuthError("WrongPassword");
		}

		session.user = user.serialize();

		return UserView.makeResponse(user);
	}

	@Get("/")
	public async isAuthorized(
		@Session() session: ExpressSession
	): Promise<UserResponse> {
		const isAuthorized = !!session.user;
		if (!isAuthorized) {
			return null;
		}

		return {
			user: session.user
		};
	}

	@Get("/logout")
	@OnUndefined(204)
	public async logout(
		@Session() session: ExpressSession
	): Promise<void> {
		const { user } = session;

		if (user) {
			delete session.user;
		}
	}

}
