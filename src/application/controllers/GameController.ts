import { Body, Get, JsonController, OnUndefined, Param, Post, Put, UseBefore } from "routing-controllers";

import { Inject } from "typedi";
import { GetUserIdFromRequest } from "../../components/decorators/GetUserIdFromRequest";
import { NotFoundError } from "../../components/http-error";
import { CheckAuthorize } from "../../components/middlewares/CheckAuthorize";
import { CheckObserverToken } from "../../components/middlewares/CheckObserverToken";
import { Game } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { GameState } from "../../infrastructure/types";
import { GameStats } from "../types";
import { AddGoal } from "../use-cases/AddGoal";
import { AddPlayer } from "../use-cases/AddPlayer";
import { StopGame } from "../use-cases/StopGame";
import { AddPlayerForm } from "../validation/AddPlayerForm";
import { GameView } from "../view/GameView";

@JsonController("/api/game")
export class GameController {

	@Inject()
	private gameRepository: GameRepository;

	@Inject()
	private userRepository: UserRepository;

	@Inject()
	private addGoal: AddGoal;

	@Inject()
	private addPlayer: AddPlayer;

	@Inject()
	private stopGame: StopGame;

	@Get("/")
	public async getState(): Promise<GameState> {
		const game = Game.getInstance();

		await this.gameRepository.save(game);

		return game.getState();
	}

	@Put("/")
	@UseBefore(CheckObserverToken)
	@OnUndefined(204)
	public async update(
		@Body() data: GameStats
	): Promise<void> {
		await this.addGoal.execute(data);
	}

	@Post("/")
	@UseBefore(CheckAuthorize)
	public async addPlayerAction(
		@GetUserIdFromRequest() userId: string,
		@Body() { role, team }: AddPlayerForm
	): Promise<GameState> {
		return this.addPlayer.execute({ role, team, userId });
	}

	@Post("/stop")
	@OnUndefined(204)
	public async stopGameAction(
		@GetUserIdFromRequest() userId: string
	): Promise<void> {
		await this.stopGame.execute(userId);
	}

	@Get("/:id")
	public async getGameById(
		@Param("id") id: string
	): Promise<GameState> {
		const gameModel = await this.gameRepository.getGameById(id);
		if (!gameModel) {
			throw new NotFoundError("game with id " + id + "not found");
		}
		const userIds = gameModel.players.map((item) => item.userId);
		const users = await this.userRepository.getUsers({ ids: userIds });

		return GameView.makeResponse(gameModel, users);
	}

}
