import { emitter, EventType } from "src/components/events";
import { Inject, Service } from "typedi";
import { ForbiddenError } from "../../components/http-error";
import { Game, Player } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { SocketService } from "../../infrastructure/services/SocketService";
import { GameState, GameStatus, Role, Team } from "../../infrastructure/types";

export interface AddPlayerParams { role: Role; team: Team; userId: string; }

@Service()
export class AddPlayer {
	@Inject()
	private gameRepository: GameRepository;
	@Inject()
	private userRepository: UserRepository;
	@Inject()
	private socketService: SocketService;

	public async execute({ role, team, userId }: AddPlayerParams): Promise<GameState> {

		const game = Game.getInstance();

		const playerUsers = game.players.map((item) => item.user.id);

		if (playerUsers.includes(userId)) {
			throw new ForbiddenError("you are already a player in this game");
		}

		if (game.status !== GameStatus.READY) {
			throw new ForbiddenError("lobby is full");
		}

		const user = await this.userRepository.getUser(userId);
		const player = new Player({
			gameId: game.id,
			team,
			role,
			user
		});

		game.addPlayer(player);

		if (game.players.length === 4) {
			game.status = GameStatus.INPROCESS;
			game.startGame = new Date();
			emitter.emit(EventType.StartGame, game.id);

			await this.gameRepository.save(game);
			await this.gameRepository.savePlayers(game.players);
		}

		this.socketService.emit("updated_game", game.getState());
		return game.getState();

	}
}
