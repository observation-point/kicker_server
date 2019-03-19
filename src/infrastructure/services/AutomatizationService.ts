import axios from "axios";
import { serviceConfig } from "../../config/service";

class AutomatizationService {
	public async startGame(id: string): Promise<void> {
		await axios.post(serviceConfig.auto + "/start", { gameId: id, gameRules: { goalsToWin: 10 } });
	}
}

export const automatizationService = new AutomatizationService();
