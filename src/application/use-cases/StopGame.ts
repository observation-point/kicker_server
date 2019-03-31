import { Inject, Service } from "typedi";
import { Game } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { AutomatizationService } from "../../infrastructure/services/AutomatizationService";
import { SocketService } from "../../infrastructure/services/SocketService";

@Service()
export class StopGame {
	@Inject()
	private gameRepository: GameRepository;

	@Inject()
	private automatizationService: AutomatizationService;

	@Inject()
	private socketService: SocketService;

	public async execute(): Promise<void> {
		const game = Game.getInstance();
		try {
			await this.automatizationService.stopGame(game.id);
		} catch (error) {
			console.log("game not started or already stopped");
		}

		game.reset();
		await this.gameRepository.save(game);

		this.socketService.emit("updated_game", game.getState());
	}
}
