import { GameStatus, Team, UserAttributes } from "../infrastructure/types";

export interface UserResponse {
	user: UserAttributes;
}

export interface GameStats {
	id: string;
	goals: Goal[];
	status: GameStatus;
}

export interface Goal {
	team: Team;
	time: Date;
}
