import { Player, PlayerInfo } from "./types";

const MAX_PLAYERS = 4;

export class Lobby {
	private players: Player[];

	public constructor() {
		this.players = [];
	}

	public add(player: Player): void {
		if (this.players.length < MAX_PLAYERS) {
			this.players.push(player);
		}
	}

	public isFull(): boolean {
		return this.players.length === MAX_PLAYERS;
	}

	public clear(): void {
		this.players = [];
	}

	public getPlayersInfo(): PlayerInfo[] {
		return this.players.map((item) => {
			const { role, side, user } = item;

			return {
				role,
				side,
				user: {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					avatar: user.avatar
				}
			};
		});
	}

}
