import { plainToClass } from "class-transformer";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Game, Goal, Player } from "../entities";
import { GameModel, GoalModel, PlayerModel } from "../models";
import { GameStatus, Role } from "../types";

@Service()
export class GameRepository {

	public async getGameById(id: string): Promise<GameModel> {
		return getRepository(GameModel).findOne(id, {
			relations: ["players", "goals"]
		});
	}

	public async save(game: Game): Promise<void> {
		await getRepository(GameModel).save(plainToClass(GameModel, game.getScheme()));
	}

	public async savePlayers(players: Player[]): Promise<void> {

		const promises = players.map((player) => {
			return getRepository(PlayerModel)
				.save(plainToClass(PlayerModel, player.getScheme()));
		});

		await Promise.all(promises);
	}

	public async saveGoal(goal: Goal): Promise<void> {
		await getRepository(GoalModel).save(plainToClass(GoalModel, goal));
	}

	public async getWinrate(userId: string, role: Role): Promise<number> {
		const winGames = await getRepository(GameModel).createQueryBuilder("game")
			.leftJoin("player", "player", "game.id = player.gameId")
			.where("game.status = :gameStatus", { gameStatus: GameStatus.FINISHED })
			.andWhere("player.role = :role and player.userId = :userId", { userId, role })
			.andWhere("game.winner = player.team")
			.getMany();

		const loseGames = await getRepository(GameModel).createQueryBuilder("game")
			.leftJoin("player", "player", "game.id = player.gameId")
			.where("game.status = :gameStatus", { gameStatus: GameStatus.FINISHED })
			.andWhere("player.role = :role and player.userId = :userId", { userId, role })
			.andWhere("game.winner != player.team")
			.getMany();

		let winrate = 0.0;
		if (winGames.length) {
			if (loseGames.length) {
				winrate = Number(((winGames.length / (winGames.length + loseGames.length)) * 100).toFixed(1));
			} else {
				winrate = 100.0;
			}
		}
		return winrate;
	}

	public async getWinCount(userId: string, role: Role): Promise<number> {
		const games = await getRepository(GameModel).createQueryBuilder("game")
			.leftJoin("player", "player", "game.id = player.gameId")
			.where("game.status = :gameStatus", { gameStatus: GameStatus.FINISHED })
			.andWhere("player.role = :role and player.userId = :userId", { userId, role })
			.andWhere("game.winner = player.team")
			.getMany();

		return games.length;
	}

	public async getGameCount(userId: string): Promise<number> {
		return getRepository(GameModel).createQueryBuilder("game")
			.leftJoin("player", "player", "game.id = player.gameId")
			.where("game.status = :gameStatus", { gameStatus: GameStatus.FINISHED })
			.andWhere("player.userId = :userId", { userId })
			.getCount();
	}

}
