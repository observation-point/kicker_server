import { Body, Get, JsonController, OnUndefined, Post, Put, UseBefore } from "routing-controllers";

import { Inject } from "typedi";
import { GetSessionFromRequest } from "../../components/decorators/GetSessionFromRequest";
import { CheckAuthorize } from "../../components/middlewares/CheckAuthorize";
import { CheckObserverToken } from "../../components/middlewares/CheckObserverToken";
import { Session } from "../../components/middlewares/Session";
import { Game } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { GameState } from "../../infrastructure/types";
import { GameStats } from "../types";
import { AddGoal } from "../use-cases/AddGoal";
import { AddPlayer } from "../use-cases/AddPlayer";
import { AddPlayerForm } from "../validation/AddPlayerForm";

@JsonController("/api/game")
export class GameController {

	@Inject()
	private gameRepository: GameRepository;

	@Inject()
	private addGoal: AddGoal;

	@Inject()
	private addPlayer: AddPlayer;

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
		@GetSessionFromRequest() session: Session,
		@Body() { role, side }: AddPlayerForm
	): Promise<GameState> {
		return this.addPlayer.execute({ role, side, userId: session.user.id });
	}

}
