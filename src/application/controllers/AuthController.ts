import { Body, Get, JsonController, OnUndefined, Param, Post } from "routing-controllers";

import { Inject } from "typedi";
import { GetSessionFromRequest } from "../../components/decorators/GetSessionFromRequest";
import { Session } from "../../components/middlewares/Session";
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
		@GetSessionFromRequest() session: Session
	): Promise<UserResponse> {
		const user = await this.userRepository.getUserByLogin(login);
		if (!user) {
			throw new Error(`Now found user with ${login}`);
		}
		user.checkPass(password);

		session.user = user.serialize();

		return UserView.makeResponse(user);
	}

	@Get("/")
	public async isAuthorized(
		@GetSessionFromRequest() session: Session
	): Promise<UserResponse> {
		const isAuthorized = !!session.user;
		if (!isAuthorized) {
			throw new Error("is not authorize");
		}

		return {
			user: session.user
		};
	}

	@Get("/logout")
	@OnUndefined(204)
	public async logout(
		@GetSessionFromRequest() session: Session
	): Promise<void> {
		const { user } = session;

		if (user) {
			session.user = null;
		}
	}

}
