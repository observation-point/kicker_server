export interface UserAttributes {
	id: string;
	firstName: string;
	lastName: string;
	avatar: string;
}

export interface GameState {
	id: string;
	players: Array<{
		role: Role,
		side: Side,
		user: UserAttributes
	}>;
	goals: Array<{
		side: Side,
		time: Date
	}>;
	status: GameStatus;
}

export enum Role {
	Defense = "defense",
	Attack = "attack"
}

export enum Side {
	RED = "RED",
	BLACK = "BLACK"
}

export enum GameStatus {
	READY = "ready",
	INPROCESS = "inprocess",
	PAUSED = "paused",
	FINISHED = "finished"
  }
