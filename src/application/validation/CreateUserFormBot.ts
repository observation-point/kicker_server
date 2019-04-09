import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserFormBot {

	@IsString()
	@MinLength(3, {
		message: "login is too short"
	})
	public login: string;

	@IsString()
	public fullname: string;

	@IsOptional()
	@IsString()
	public avatar: string;

}
