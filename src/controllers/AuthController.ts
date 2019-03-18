import { Body, Get, JsonController, OnUndefined, Param, Post } from "routing-controllers";

import { GetSessionFromRequest } from "../components/decorators/GetSessionFromRequest";
import { Session } from "../components/middlewares/Session";
import { userService } from "../infrastructure/services/UserService";
import { UserResponse } from "./types";
import { LoginParamForm } from "./validation/LoginParamForm";
import { UserView } from "./view/UserView";

@JsonController("/auth")
export class AurhController {

	@Post("/:login")
	public async login(
		@Param("login") login: string,
		@Body() { password }: LoginParamForm,
		@GetSessionFromRequest() session: Session
	): Promise<UserResponse> {
		const user = await userService.getUserByLogin(login);
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
	): Promise<{ isAuthorized: boolean }> {
		const isAuthorized = !!session.user;

		return { isAuthorized };
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
