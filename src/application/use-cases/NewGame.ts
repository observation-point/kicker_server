import { Inject, Service } from "typedi";
import { Game } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { ReplayService } from "../../infrastructure/services/ReplayService";
import { SocketService } from "../../infrastructure/services/SocketService";
import { GameStatus } from "../../infrastructure/types";

@Service()
export class NewGame {
	@Inject()
	private gameRepository: GameRepository;

	@Inject()
	private socketService: SocketService;

	@Inject()
	private replayService: ReplayService;

	public async execute(): Promise<void> {
		const game = Game.getInstance();
		if (game.status === GameStatus.FINISHED) {
			game.reset();
			await this.gameRepository.save(game);
			await this.replayService.stopRecordingGame();
		} else {
			await this.replayService.startRecordingGame(game.id);
		}

		this.socketService.emit("updated_game", game.getState());
	}
}
