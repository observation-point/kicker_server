import { Inject, Service } from "typedi";
import { emitter, EventType } from "../../components/events";
import { Game, Player } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { SocketService } from "../../infrastructure/services/SocketService";
import { GameStatus } from "../../infrastructure/types";

@Service()
export class PlayAgain {
	@Inject()
	private gameRepository: GameRepository;

	@Inject()
	private socketService: SocketService;

	public async execute(): Promise<void> {
		const game = Game.getInstance();
		if (game.status !== GameStatus.FINISHED) {
			throw new Error("this game status is not finished");
		}

		game.playAgain();
		await this.gameRepository.save(game);
		await this.savePLayers(game.players, game.id);

		emitter.emit(EventType.StartGame, game.id);
		this.socketService.emit("updated_game", game.getState());
	}

	private async savePLayers(players: Player[], gameId: string): Promise<void> {

		const newPlayers = players.map((item) => {
			const { role, team, user } = item;
			return new Player({ gameId, team, role, user });
		});

		await this.gameRepository.savePlayers(newPlayers);
	}
}
