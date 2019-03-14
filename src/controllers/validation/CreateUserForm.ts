import { IsOptional, IsString, IsUUID } from "class-validator";
import { User } from "src/domain/User/User";

export class CreateUserForm implements User {

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
