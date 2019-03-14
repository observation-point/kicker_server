import { IsOptional, IsString, IsUUID } from "class-validator";
import { User } from "src/domain/User/User";

export class LoginParamForm {

	@IsString()
	public password: string;

}
