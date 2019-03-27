import { Body, Get, JsonController, OnUndefined, Post, Put, UseBefore } from "routing-controllers";

import { GetSessionFromRequest } from "../components/decorators/GetSessionFromRequest";
import { CheckObserverToken } from "../components/middlewares/CheckObserverToken";
import { Session } from "../components/middlewares/Session";
import { Game, Goal } from "../infrastructure/entities";
import { Player } from "../infrastructure/entities/Player";
import { gameRepository } from "../infrastructure/repository/GameRepository";
import { userRepository } from "../infrastructure/repository/UserRepository";
import { GameState, GameStatus, Role, Side } from "../infrastructure/types";
import { GameStats } from "./types";
import { AddPlayerForm } from "./validation/AddPlayerForm";

@JsonController("/api/game")
export class GameController {

	@Get("/")
	public async getState(): Promise<GameState> {
		const game = Game.getInstance();

		await gameRepository.save(game);
		return game.getState();
	}

	@Put("/")
	@UseBefore(CheckObserverToken)
	@OnUndefined(204)
	public async update(
		@Body() data: GameStats
	): Promise<void> {
		const game = Game.getInstance();
		await gameRepository.save(game);
		if (data.id !== game.id) {
			throw new Error("invalid game");
		}

		if (game.status !== GameStatus.INPROCESS) {
			throw new Error("update count is possible only with process game status");
		}

		const newGoalsData = data.goals.filter((item) => {
			return !game.goals.find((g) => g.side === item.team && g.time === item.time);
		});

		const newGoals = newGoalsData.map(({ team, time }) => {
			return new Goal(game.id, team, time);
		});

		await Promise.all(newGoals.map((item) => gameRepository.saveGoal(item)));
		game.addGoals(newGoals);

		if (data.status === GameStatus.FINISHED) {
			game.status = data.status;
			game.endGame = new Date();
			await gameRepository.save(game);

			game.reset();
			await gameRepository.save(game);
		}
	}

	@Post("/")
	public async addPlayer(
		@GetSessionFromRequest() session: Session,
		@Body() { role, side }: AddPlayerForm
	): Promise<GameState> {
		if (!session.user) {
			throw Error("not authorize");
		}

		const game = Game.getInstance();
		await gameRepository.save(game);
		if (game.status !== GameStatus.READY) {
			throw new Error("lobby is full");
		}

		const user = await userRepository.getUser(session.user.id);
		const player = new Player({
			gameId: game.id,
			side,
			role,
			user
		});

		await gameRepository.savePlayer(player);
		game.addPlayer(player);

		return game.getState();
	}

}
