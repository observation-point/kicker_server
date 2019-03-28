import { Inject, Service } from "typedi";
import { AutomatizationService } from "../services/AutomatizationService";

@Service()
export class GameHandlers {

	@Inject()
	private automatizationService: AutomatizationService;

	public async startGame(gameId: string): Promise<void> {
		await this.automatizationService.startGame(gameId);
	}
}
