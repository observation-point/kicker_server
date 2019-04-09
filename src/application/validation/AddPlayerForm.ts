import { IsEnum } from "class-validator";
import { Role, Team } from "../../infrastructure/types";

export class AddPlayerForm {

	@IsEnum(Role)
	public role: Role;

	@IsEnum(Team)
	public team: Team;

}
