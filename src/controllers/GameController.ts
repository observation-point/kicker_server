import { Body, Get, JsonController, OnUndefined, Post, Put } from "routing-controllers";

import { GetSessionFromRequest } from "../components/decorators/GetSessionFromRequest";
import { Session } from "../components/middlewares/Session";
import { userService } from "../infrastructure/services/UserService";
import { Game, GameState, Role, Side, GameStatus, Goal } from "src/infrastructure/entities";
import { Player } from "src/infrastructure/entities/Player";
import { gameService } from "src/infrastructure/services/GameService";

@JsonController("/game")
export class GameController {

	@Get("/")
	public async getState(): Promise<GameState> {
		const game = Game.getInstance();
		return game.getState();
	}

	@Put("/")
	@OnUndefined(204)
	public async update(
		@Body() { side, time }: { side: Side, time: Date }
	): Promise<void> {
		const game = Game.getInstance();
		if (game.status !== GameStatus.Process) {
			throw new Error("update count is possible only with process game status");
		}
		const goal = new Goal(game.id, side, time);

		game.addGoal(goal);
		await gameService.save(game);
	}

	@Post("/")
	public async addPlayer(
		@GetSessionFromRequest() session: Session,
		@Body() { role, side }: { role: Role, side: Side }
	): Promise<GameState> {
		const game = Game.getInstance();
		if (game.status !== GameStatus.Start) {
			throw new Error("lobby is full");
		}

		if (!session.user) {
			throw Error("not authorize");
		}

		const user = await userService.getUser(session.user.id);
		const player = new Player(game.id, side, role, user);

		await game.addPlayer(player);

		await gameService.save(game);

		return game.getState();
	}

}
