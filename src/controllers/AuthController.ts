import { LoginParamForm } from "./validation/LoginParamForm";
import { UserView } from "./view/UserView";
import { UserResponse } from "./types";
import { JsonController, Post, Body, Param, Get, OnUndefined } from "routing-controllers";
import { getSalt, generatePasswordHash } from "../components/crypto";
import { userRepository } from "../infrastructure/User/UserRepository";
import { GetSessionFromRequest } from "../components/decorators/GetSessionFromRequest";
import { Session } from "../components/middlewares/Session";

@JsonController("/auth")
export class AurhController {

    @Post("/:login")
	public async login(
        @Param('login') login: string,
		@Body() { password }: LoginParamForm,
		@GetSessionFromRequest() session: Session
	): Promise<UserResponse> {
		const user = await userRepository.getUserByLogin(login);
		if (!user) {
			throw new Error(`Now found user with ${login}`);
		}
		const salt = getSalt(user.password);
		const hashPassword = generatePasswordHash(password, salt);

		if (user.password !== hashPassword) {
			throw new Error("Wrong password");
		}

		const { password: pswd, ...data } = user;

		session.user = data;

		return UserView.makeResponse(user);
    }

    @Get('/')
    public async isAuthorized(
        @GetSessionFromRequest() session: Session
    ): Promise<{ isAuthorized: boolean }> {
        const isAuthorized = !!session.user;

        return { isAuthorized };
	}
	
	@Get('/logout')
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