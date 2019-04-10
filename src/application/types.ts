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

export interface LeaderboardResponse {
	usersStats: UserStats[];
}

export interface UserStats {
	fullname: string;
	rating: number;
	gamesCount: number;
	winsInAttack: number;
	winsInDefense: number;
}

export interface LeaderboardQuery {
	limit?: number;
	offset?: number;
}
