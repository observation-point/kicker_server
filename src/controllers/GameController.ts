import { Body, Get, JsonController, OnUndefined, Post, Put } from "routing-controllers";

import { Game, GameState, Role, Side } from "../domain/Game";
import { userRepository } from "../infrastructure/User/UserRepository";
import { GetSessionFromRequest } from "../components/decorators/GetSessionFromRequest";
import { Session } from "../components/middlewares/Session";

@JsonController("/game")
export class GameController {

	@Get("/")
	public async getState(): Promise<GameState> {
		const game = Game.getInstance();
		return game.getState();
	}

	@Put("/")
	@OnUndefined(204)
	public async updateCount(
		@Body() { count }: { count: number[] }
	): Promise<void> {
		const game = Game.getInstance();

		game.updateCount(count);
	}

	@Post("/")
	public async addPlayer(
		@GetSessionFromRequest() session: Session,
		@Body() { role, side }: { role: Role, side: Side }
	): Promise<GameState> {
		if (!session.user) {
			throw Error('Not authorize');
		}
		const { password, ...user } = await userRepository.getUser(session.user.id);

		const game = Game.getInstance();

		if(!game.getState().players.find(item => {
			return item.user.id === user.id;
		})) {
			game.addPlayer({ role, side, user });
			
		}

		return game.getState();
	}

}
