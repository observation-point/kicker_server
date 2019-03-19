import { getRepository } from "typeorm";
import { automatizationService } from "../services/AutomatizationService";

class GameHandlers {
	public async startGame(gameId: string): Promise<void> {
		await automatizationService.startGame(gameId);
	}
}

export const gameHandlers = new GameHandlers();
