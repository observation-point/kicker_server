import { Inject, Service } from "typedi";
import { Game } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { SocketService } from "../../infrastructure/services/SocketService";
import { GameStatus } from "../../infrastructure/types";
import { NewGameType } from "../types";

@Service()
export class NewGame {
	@Inject()
	private gameRepository: GameRepository;

	@Inject()
	private socketService: SocketService;

	public async execute(): Promise<void> {
		const game = Game.getInstance();
		if (game.status === GameStatus.FINISHED) {
			game.reset();
			await this.gameRepository.save(game);
		}

		this.socketService.emit("updated_game", game.getState());
	}
}
