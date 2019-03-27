import { getRepository } from "typeorm";
import { Game } from "../entities";
import { PlayerModel, GoalModel, GameModel } from "../models";
import { plainToClass } from "class-transformer";

class GameRepository {
	public async getGameById(id: string): Promise<Game> {
		return getRepository(Game).findOne(id);
	}

	public async save(game: Game): Promise<void> {
		await Promise.all([
			...game.players.map((item) => getRepository(PlayerModel).save(plainToClass(PlayerModel, item.getScheme())))
		]);

		await Promise.all([
			...game.goals.map((item) => getRepository(GoalModel).save(plainToClass(GoalModel, item)))
		]);

		await getRepository(GameModel).save(plainToClass(GameModel, game.getScheme()));
	}

}

export const gameRepository = new GameRepository();
