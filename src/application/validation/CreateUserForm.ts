import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreateUserForm {

	@IsString()
	@MinLength(3, {
        message: "login is too short"
    })
	public login: string;

	@IsString()
	@MinLength(3, {
        message: "password is too short"
    })
	public password: string;

	@IsString()
	public fullname: string;

	@IsOptional()
	@IsString()
	public avatar: string;

}
