import { GameStatus, Side, UserAttributes } from "../infrastructure/types";

export interface UserResponse {
	user: UserAttributes;
}

export interface GameStats {
	id: string;
	goals: Goal[];
	status: GameStatus;
}

export interface Goal {
	team: Side;
	time: Date;
}
