import { plainToClass } from "class-transformer";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Game, Goal, Player } from "../entities";
import { GameModel, GoalModel, PlayerModel } from "../models";
import { GameStatus, Role } from "../types";

@Service()
export class GameRepository {
	public async getGameById(id: string): Promise<Game> {
		return await getRepository(Game).findOne(id);
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

	public async getWinCount(userId: string, role: Role): Promise<number> {
		const games = await getRepository(GameModel).createQueryBuilder("game")
			.leftJoin("player", "player", "game.id = player.gameId")
			.where("game.status = :gameStatus", { gameStatus: GameStatus.FINISHED })
			.andWhere("player.role = :role and player.userId = :userId", { userId, role })
			.andWhere("game.winner = player.side")
			.getMany();

		return games.length;
	}

}
