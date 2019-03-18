export interface UserAttrib {
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
		user: UserAttrib
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
	Red = "red",
	Black = "black"
}

export enum GameStatus {
	Start = "start",
	Process = "process",
	End = "end"
}
