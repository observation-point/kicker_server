import { IsEnum } from "class-validator";
import { Role, Side } from "../../infrastructure/types";

export class AddPlayerForm {

	@IsEnum(Role)
	public role: Role;

	@IsEnum(Side)
	public side: Side;

}
