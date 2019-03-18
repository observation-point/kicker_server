import { IsOptional, IsString, IsUUID } from "class-validator";

export class LoginParamForm {

	@IsString()
	public password: string;

}
