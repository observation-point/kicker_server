import { Inject, Service } from "typedi";
import { Game, Player } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { GameState, GameStatus, Role, Side } from "../../infrastructure/types";

export interface AddPlayerParams { role: Role; side: Side; userId: string; }

@Service()
export class AddPlayer {
	@Inject()
	private gameRepository: GameRepository;
	@Inject()
	private userRepository: UserRepository;
	public async execute({ role, side, userId }: AddPlayerParams): Promise<GameState> {

		const game = Game.getInstance();

		if (game.status !== GameStatus.READY) {
			throw new Error("lobby is full");
		}

		const user = await this.userRepository.getUser(userId);
		const player = new Player({
			gameId: game.id,
			side,
			role,
			user
		});

		await this.gameRepository.savePlayer(player);
		game.addPlayer(player);

		return game.getState();

	}
}
