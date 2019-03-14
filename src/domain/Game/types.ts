import { User } from "../User/User";

export enum Role { Defense = 0, Attak = 1 }
export enum Side { Red = 0, Black = 1 }

export interface GameState {
	players: PlayerInfo[];
	count: number[];
	isRunning: boolean;
}

export interface Player {
	role: Role;
	side: Side;
	user: User;
}

export interface PlayerInfo {
	role: Role;
	side: Side;
	user: {
		id?: string;
		firstName: string;
		lastName: string;
		avatar: string;
	};
}
