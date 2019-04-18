import { Inject, Service } from "typedi";
import { Game } from "../../infrastructure/entities";
import { SocketService } from "../../infrastructure/services/SocketService";
import { GameStatus } from "../../infrastructure/types";

@Service()
export class RemoveFromLobby {
	@Inject()
	private socketService: SocketService;

	public async execute(userId: string): Promise<void> {
		const game = Game.getInstance();
		if (game.status !== GameStatus.READY) {
			throw new Error("game already started");
		}

		game.players = game.players.filter((item) => item.user.id !== userId);
		this.socketService.emit("updated_game", game.getState());
	}
}
