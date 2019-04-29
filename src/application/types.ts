import { GameStatus, Team, UserAttributes } from "../infrastructure/types";

export interface UserResponse {
	user: UserAttributes;
}

export enum NewGameType {
	Next = "next",
	PlayAgain = "play_again"
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
	userId: string;
	avatar: string;
	fullname: string;
	rating: number;
	gamesCount: number;
	winsInAttack?: number;
	winsInDefense?: number;

	winrateAttack?: number;
	winrateDefense?: number;
	winGamesCount?: number;
}

export interface LeaderboardQuery {
	limit?: number;
	offset?: number;
}
