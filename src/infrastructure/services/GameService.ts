import { getRepository } from "typeorm";
import { Game, Goal } from "../entities";
import { Player } from "../entities/Player";

class GameService {
	public async getGameById(id: string): Promise<Game> {
		return getRepository(Game).findOne(id);
	}

	public async save(game: Game): Promise<Game> {
		await Promise.all([
			...game.players.map((item) => getRepository(Player).save(item))
		]);

		await Promise.all([
			...game.goals.map((item) => getRepository(Goal).save(item))
		]);

		return getRepository(Game).save(game);
	}

}

export const gameService = new GameService();
