export interface UserAttributes {
	id: string;
	login: string;
	fullname: string;
	avatar?: string;
	rating: number;
	password?: string;
	token?: string;
}

export interface UserQueryParam {
	limit?: number;
	offset?: number;
	ids?: string[];
}

export interface GameState {
	id: string;
	players: Array<{
		role: Role,
		team: Team,
		user: UserAttributes,
		winRate?: number
	}>;
	goals: Array<{
		team: Team,
		time: Date
	}>;
	status: GameStatus;
	startGame: Date;
	endGame?: Date;
}

export enum Role {
	Defense = "defense",
	Attack = "attack"
}

export enum Team {
	RED = "RED",
	BLACK = "BLACK"
}

export enum GameStatus {
	READY = "ready",
	INPROCESS = "inprocess",
	PAUSED = "paused",
	FINISHED = "finished"
}
