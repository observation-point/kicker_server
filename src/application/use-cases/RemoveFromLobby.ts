import { Service } from "typedi";
import { Game } from "../../infrastructure/entities";
import { GameStatus } from "../../infrastructure/types";

@Service()
export class RemoveFromLobby {
	public async execute(userId: string): Promise<void> {
		const game = Game.getInstance();
		if (game.status !== GameStatus.READY) {
			throw new Error("game already started");
		}

		game.players = game.players.filter((item) => item.user.id !== userId);
	}
}
