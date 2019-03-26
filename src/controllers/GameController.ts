import { Body, Get, JsonController, OnUndefined, Post, Put } from "routing-controllers";

import { GetSessionFromRequest } from "../components/decorators/GetSessionFromRequest";
import { Session } from "../components/middlewares/Session";
import { Game, GameState, GameStatus, Goal, Role, Side } from "../infrastructure/entities";
import { Player } from "../infrastructure/entities/Player";
import { gameService } from "../infrastructure/services/GameService";
import { userService } from "../infrastructure/services/UserService";
import { GameStats } from "./types";
import { CheckToken } from "src/components/decorators/CheckToken";

@JsonController("/api/game")
export class GameController {

	@Get("/")
	public async getState(): Promise<GameState> {
		const game = Game.getInstance();

		await gameService.save(game);
		return game.getState();
	}

	@Put("/")
	@OnUndefined(204)
	public async update(
		@Body() data: GameStats,
		@CheckToken() action: any
	): Promise<void> {
		console.log(action);

		const game = Game.getInstance();
		if (data.id !== game.id) {
			throw new Error("invalid game");
		}

		if (game.status !== GameStatus.INPROCESS) {
			throw new Error("update count is possible only with process game status");
		}
		console.log("GAME GOALS", JSON.stringify(game.goals, null, 3));

		const newGoals = data.goals.filter((item) => {
			return !game.goals.find((g) => g.side === item.team && g.time === item.time);
		});

		console.log("NEW GOALS", JSON.stringify(newGoals, null, 3));
		
		newGoals.forEach(({ team, time }) => {
			game.addGoal(new Goal(game.id, team, time));
		});
		await gameService.save(game);

		if (data.status === GameStatus.FINISHED) {
			game.status = data.status;
			game.endGame = new Date();
			await gameService.save(game);

			Game.newInstance();
		}
	}

	@Post("/")
	public async addPlayer(
		@GetSessionFromRequest() session: Session,
		@Body() { role, side }: { role: Role, side: Side }
	): Promise<GameState> {
		const game = Game.getInstance();
		if (game.status !== GameStatus.READY) {
			throw new Error("lobby is full");
		}

		if (!session.user) {
			throw Error("not authorize");
		}

		const user = await userService.getUser(session.user.id);
		const player = new Player({
			gameId: game.id,
			side,
			role,
			user
		});

		await game.addPlayer(player);

		await gameService.save(game);

		return game.getState();
	}

}
