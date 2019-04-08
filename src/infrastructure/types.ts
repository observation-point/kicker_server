export interface UserAttributes {
	id: string;
	firstName: string;
	lastName: string;
	avatar: string;
	rating: number;
}

export interface GameState {
	id: string;
	players: Array<{
		role: Role,
		team: Team,
		user: UserAttributes
	}>;
	goals: Array<{
		team: Team,
		time: Date
	}>;
	status: GameStatus;
	startGame: Date;
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
