import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateUserForm {

	@IsUUID("4")
	public id: string;

	@IsString()
	public login: string;

	@IsString()
	public password: string;

	@IsString()
	public firstName: string;

	@IsString()
	public lastName: string;

	@IsOptional()
	@IsString()
	public avatar: string;

}
