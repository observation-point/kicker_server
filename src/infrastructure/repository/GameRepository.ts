import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { Game, Goal, Player } from "../entities";
import { GameModel, GoalModel, PlayerModel } from "../models";

class GameRepository {
	public async getGameById(id: string): Promise<Game> {
		return getRepository(Game).findOne(id);
	}

	public async save(game: Game): Promise<void> {

		await getRepository(GameModel).save(plainToClass(GameModel, game.getScheme()));
	}

	public async savePlayer(player: Player): Promise<void> {
		await getRepository(PlayerModel).save(plainToClass(PlayerModel, player.getScheme()));
	}

	public async saveGoal(goal: Goal): Promise<void> {
		await getRepository(GoalModel).save(plainToClass(GoalModel, goal));
	}

}

export const gameRepository = new GameRepository();
