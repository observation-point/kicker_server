import { User } from "../../infrastructure/entities/User";
import { GameModel, UserModel } from "../../infrastructure/models";
import { GameState } from "../../infrastructure/types";

export class GameView {
	public static makeResponse(gameModel: GameModel, users: User[]): GameState {

		const id = gameModel.id;
		const players = gameModel.players.map((item) => {
			const user = users.find((u) => u.id === item.userId);

			return {
				role: item.role,
				team: item.team,
				user: user.serialize()
			};
		});
		const goals = gameModel.goals.map((item) => ({ id: item.id, team: item.team, time: item.time }));
		const startGame = gameModel.startGame;
		const endGame = gameModel.endGame;
		const status = gameModel.status;

		return {
			id,
			players,
			goals,
			startGame,
			endGame,
			status
		};

	}
}
