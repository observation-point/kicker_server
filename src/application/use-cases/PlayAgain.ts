import { Inject, Service } from "typedi";
import { emitter, EventType } from "../../components/events";
import { Game, Player } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { SocketService } from "../../infrastructure/services/SocketService";
import { GameStatus } from "../../infrastructure/types";
import { NewGameType } from "../types";

@Service()
export class PlayAgain {
	@Inject()
	private gameRepository: GameRepository;

	@Inject()
	private socketService: SocketService;

	public async execute(): Promise<void> {
		const game = Game.getInstance();
		if (game.status === GameStatus.FINISHED) {
			game.playAgain();
            await this.gameRepository.save(game);

			await this.savePLayers(game.players, game.id);

			emitter.emit(EventType.StartGame, game.id);
			this.socketService.emit("updated_game", game.getState());
		} else {
			throw new Error("this game status is not finished");
		}
	}

	private async savePLayers(players: Player[], gameId: string): Promise<void> {
		const promises: any[] = [];

		players.forEach((item) => {
			const { role, team, user } = item;
			const player = new Player({ gameId, team, role, user });
			promises.push(this.gameRepository.savePlayer(player));
		});

		await Promise.all(promises);
	}
}
