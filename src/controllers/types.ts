import { GameStatus, Side, UserAttrib } from "../infrastructure/entities";

export interface UserResponse {
	user: UserAttrib;
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
