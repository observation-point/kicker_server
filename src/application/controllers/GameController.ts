import { Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, UseBefore } from "routing-controllers";
import { Inject } from "typedi";

import { GetUserIdFromRequest } from "../../components/decorators/GetUserIdFromRequest";
import { CheckAuthorize } from "../../components/middlewares/CheckAuthorize";
import { CheckObserverToken } from "../../components/middlewares/CheckObserverToken";
import { Game } from "../../infrastructure/entities";
import { GameRepository } from "../../infrastructure/repository/GameRepository";
import { GameState } from "../../infrastructure/types";
import { GameStats, NewGameType } from "../types";
import { AddGoal } from "../use-cases/AddGoal";
import { AddPlayer } from "../use-cases/AddPlayer";
import { GameResults } from "../use-cases/GameResults";
import { NewGame } from "../use-cases/NewGame";
import { PlayAgain } from "../use-cases/PlayAgain";
import { RemoveFromLobby } from "../use-cases/RemoveFromLobby";
import { StopGame } from "../use-cases/StopGame";
import { AddPlayerForm } from "../validation/AddPlayerForm";
import { GameView } from "../view/GameView";

@JsonController("/api/game")
export class GameController {

	@Inject()
	private gameRepository: GameRepository;

	@Inject()
	private addGoal: AddGoal;

	@Inject()
	private addPlayer: AddPlayer;

	@Inject()
	private stopGame: StopGame;

	@Inject()
	private newGame: NewGame;

	@Inject()
	private playAgain: PlayAgain;

	@Inject()
	private removeFromLobby: RemoveFromLobby;

	@Inject()
	private gameResults: GameResults;

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

	@Delete("/")
	@UseBefore(CheckAuthorize)
	@OnUndefined(204)
	public async removeFromLobbyAction(
		@GetUserIdFromRequest() userId: string
	): Promise<void> {
		await this.removeFromLobby.execute(userId);
	}

	@Post("/stop")
	@OnUndefined(204)
	public async stopGameAction(
		@GetUserIdFromRequest() userId: string
	): Promise<void> {
		await this.stopGame.execute(userId);
	}

	@Post("/new")
	@OnUndefined(204)
	public async newGameAction(
		@GetUserIdFromRequest() userId: string,
		@Body() { type }: { type: NewGameType }
	): Promise<void> {
		console.log(type);
		if (type === NewGameType.Next) {
			await this.newGame.execute();
		}
		if (type === NewGameType.PlayAgain) {
			await this.playAgain.execute();
		}
	}

	@Get("/:id")
	public async getGameById(
		@Param("id") id: string
	): Promise<GameState> {
		return GameView.makeResponse(await this.gameResults.execute(id));
	}

}
